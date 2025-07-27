import express from "express";
import multer from "multer";
import { processPdf } from "../lib/process.js"; 
const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = req.file.buffer;
    const result = await processPdf(buffer);
    res.status(200).json(result);
  } catch (err: any) {
    console.error("PDF upload error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

export default router;
