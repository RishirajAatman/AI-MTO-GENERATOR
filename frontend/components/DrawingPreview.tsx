interface Props {
  previewImage: string;
}

export default function DrawingPreview({ previewImage }: Props) {
  if (!previewImage) return null;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-5">
        📄 Processed Drawing Preview
      </h2>

      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
        <img
    src={previewImage}
    alt="Processed Drawing"
    className="w-full h-[520px] object-contain rounded-xl bg-slate-50"
/>
      </div>

    </div>
  );
}