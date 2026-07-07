"use client";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import UploadCard from "@/components/UploadCard";
import SummaryCards from "@/components/SummaryCards";
import MetadataCard from "@/components/MetadataCard";
import MtoTable from "@/components/MtoTable";
import DownloadButton from "@/components/DownloadButton";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import StatusBanner from "@/components/StatusBanner";
import { MTOResponse } from "@/types/mto";
import DrawingPreview from "@/components/DrawingPreview";
export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [result, setResult] = useState<MTOResponse | null>(null);
  const [source, setSource] = useState<"gemini" | "mock" | null>(null);
  async function handleExtract() {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await api.post("/extract", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("FULL RESPONSE", response.data);
      console.log("MTO", response.data.mto);
      console.log("ITEMS", response.data.mto.items);
      setResult(response.data.mto);
      setSource(response.data.source);
      setPreviewImage(
  `http://127.0.0.1:8000${response.data.preview_image}`
);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
      <LoadingOverlay loading={loading} />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800">
            🤖 AI Material Take-Off Generator
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Upload a piping isometric drawing and let AI automatically
            extract the Material Take-Off, generate engineering summaries,
            and export results as CSV.
          </p>
        </div>

        {/* Upload Card */}
        <UploadCard
          file={file}
          setFile={setFile}
          loading={loading}
          onExtract={handleExtract}
        />
        {!result && !loading && <EmptyState />}
        {/* Results */}
        {/* Results */}
{/* Results */}
{/* Results */}
{result && (
  <>
    {source && <StatusBanner source={source} />}

    {/* Preview + Metadata */}
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

      <DrawingPreview previewImage={previewImage} />

      <div className="h-full">
    <MetadataCard meta={result.drawing_meta} />
</div>

    </div>

    {/* Summary */}
    <SummaryCards summary={result.summary} />

    {/* MTO */}
    <MtoTable items={result.items} />

    {/* Export */}
    <DownloadButton />
  </>
)}
        <Footer />
      </div>
    </main>
  );
}