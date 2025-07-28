"use client";

import { isLoggedIn } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PdfUploadForm from "../components/PdfUploadForm";

export default function UploadPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
    }
  }, [router]);

  if (!isLoggedIn()) return null;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Upload</h1>
      <PdfUploadForm />
    </>
  );
}