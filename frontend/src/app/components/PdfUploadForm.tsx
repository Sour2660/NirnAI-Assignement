"use client";

import { useState } from "react";
import { api } from "@/app/lib/api";

export default function PdfUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await api.post("/transactions/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="font-semibold text-lg">Upload a PDF</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="border rounded p-2 w-full"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={!file || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload & Process"}
        </button>
      </form>

      {result && (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <p className="font-medium">Inserted: {result.insertedCount}</p>
          <pre className="text-xs bg-gray-50 p-2 rounded max-h-96 overflow-auto">
            {JSON.stringify(result.records, null, 2)}
          </pre>
          <a href="/results" className="text-blue-600 underline">Go to Results →</a>
        </div>
      )}
    </div>
  );
}