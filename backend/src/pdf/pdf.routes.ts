// src/pdf/pdf.routes.ts
import express from "express";
import multer from "multer";
import { processPdf } from "../lib/process";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = req.file.buffer;
    const result = await processPdf(buffer);
    res.status(200).json({ message: "PDF processed successfully", result });
  } catch (error: any) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process PDF", details: error.message });
  }
});

export default router;
