interface Props {
  source: "gemini" | "mock";
}

export default function StatusBanner({ source }: Props) {
  if (source === "gemini") {
    return (
      <div className="mb-8 rounded-2xl border border-green-300 bg-green-50 p-5">
        <h3 className="text-lg font-bold text-green-800">
          ✅ AI Extraction Successful
        </h3>

        <p className="mt-2 text-green-700">
          Results were generated using Gemini AI.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-2xl border border-yellow-300 bg-yellow-50 p-5">
      <h3 className="text-lg font-bold text-yellow-800">
        ⚠️ AI Service Temporarily Unavailable
      </h3>

      <p className="mt-2 text-yellow-700">
        Gemini AI could not process the drawing because the API quota was
        exceeded or the service is temporarily unavailable. Sample extraction
        data is being displayed so you can continue exploring the application.
      </p>
    </div>
  );
}