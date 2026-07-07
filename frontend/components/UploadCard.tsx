"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, Sparkles } from "lucide-react";

interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
  onExtract: () => void;
}

export default function UploadCard({
  file,
  setFile,
  loading,
  onExtract,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-3xl
          p-16 text-center cursor-pointer
          transition-all duration-300

          ${
            isDragActive
              ? "border-blue-500 bg-blue-100 scale-[1.02]"
              : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
          }
        `}
      >
        <input {...getInputProps()} />

        <UploadCloud
          size={72}
          className="mx-auto text-blue-600 mb-6"
        />

        <h2 className="text-3xl font-bold text-slate-800">
          Upload Isometric Drawing
        </h2>

        <p className="text-slate-600 mt-3 text-lg">
          Drag & Drop your drawing here
        </p>

        <p className="text-slate-500 mt-2">
          or click anywhere to browse files
        </p>

        <div className="mt-6 inline-flex bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-600">
          PDF • PNG • JPG
        </div>
      </div>

      {file && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">

          <div className="bg-green-100 p-3 rounded-xl">
            <FileText className="text-green-700" size={28} />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-slate-800">
              {file.name}
            </p>

            <p className="text-sm text-slate-500">
              Ready for AI extraction
            </p>
          </div>

        </div>
      )}

      <button
        onClick={onExtract}
        disabled={!file || loading}
        className="
          mt-8
          w-full
          bg-gradient-to-r
          from-blue-600
          to-blue-700
          hover:from-blue-700
          hover:to-blue-800
          disabled:from-gray-400
          disabled:to-gray-400
          transition-all
          duration-300
          text-white
          py-4
          rounded-2xl
          font-bold
          text-lg
          shadow-lg
          flex
          justify-center
          items-center
          gap-3
        "
      >
        <Sparkles size={22} />

        {loading
          ? "AI is analyzing your drawing..."
          : "Extract Material Take-Off"}
      </button>

    </div>
  );
}