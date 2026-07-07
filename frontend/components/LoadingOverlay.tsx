interface Props {
  loading: boolean;
}

export default function LoadingOverlay({ loading }: Props) {
  if (!loading) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          px-12
          py-10
          text-center
          max-w-md
        "
      >
        <div className="text-6xl animate-bounce mb-6">
          🤖
        </div>

        <h2 className="text-3xl font-bold text-slate-800">
          AI is analyzing...
        </h2>

        <p className="mt-4 text-slate-600">
          Please wait while we extract the
          Material Take-Off from your drawing.
        </p>

        <div className="mt-8 flex justify-center">

          <div
            className="
              h-12
              w-12
              rounded-full
              border-4
              border-blue-500
              border-t-transparent
              animate-spin
            "
          />

        </div>

        <p className="mt-6 text-sm text-slate-500">
          This may take 10–30 seconds.
        </p>
      </div>
    </div>
  );
}