"use client";

import { Download, FileSpreadsheet } from "lucide-react";

export default function DownloadButton() {
  function handleDownload() {
    window.open(
      "http://127.0.0.1:8000/export/csv",
      "_blank"
    );
  }

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-5">

          <div className="bg-green-100 p-4 rounded-2xl">

            <FileSpreadsheet
              className="text-green-700"
              size={36}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Export Results
            </h2>

            <p className="text-slate-600 mt-2">
              Download the extracted Material Take-Off
              as a CSV file for further processing.
            </p>

          </div>

        </div>

        <button
          onClick={handleDownload}
          className="
            bg-gradient-to-r
            from-green-600
            to-green-700
            hover:from-green-700
            hover:to-green-800
            text-white
            px-8
            py-4
            rounded-2xl
            shadow-lg
            flex
            items-center
            gap-3
            font-bold
            transition-all
            duration-300
            hover:scale-105
          "
        >

          <Download size={22} />

          Download CSV

        </button>

      </div>

    </div>
  );
}