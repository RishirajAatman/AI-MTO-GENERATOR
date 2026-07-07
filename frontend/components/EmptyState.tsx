import { FileSearch } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="mt-12 bg-white rounded-3xl shadow-lg border border-slate-200 p-12 text-center">

      <div className="mx-auto w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
        <FileSearch className="text-blue-600" size={42} />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-slate-800">
        Ready to Analyze Your Drawing
      </h2>

      <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
        Upload a piping isometric drawing in PDF, PNG or JPG format.
        Our AI will automatically extract the Material Take-Off,
        summarize components and generate a downloadable CSV report.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
          📄 PDF
        </span>

        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
          🖼 PNG
        </span>

        <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium">
          📷 JPG
        </span>

      </div>

    </div>
  );
}