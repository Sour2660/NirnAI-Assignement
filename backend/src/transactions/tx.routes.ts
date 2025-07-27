import { Router } from "express";
import multer from "multer";
import { processPdf, search } from "./tx.service.js";
import { z } from "zod";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("[/upload] File received:", req.file?.originalname);
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await processPdf(req.file.buffer);
    return res.json(result);
  } catch (e: any) {
    console.error("[/upload] Error:", e);
    return res
      .status(500)
      .json({ error: e.message || "Internal Server Error" });
  }
});

const searchSchema = z.object({
  buyerName: z.string().optional(),
  sellerName: z.string().optional(),
  houseNo: z.string().optional(),
  surveyNo: z.string().optional(),
  documentNo: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  limit: z.coerce.number().optional(),
});


router.get("/", async (req, res) => {
  try {
    const parsed = searchSchema.parse(req.query);
    console.log("[/transactions] Search params:", parsed);
    const rows = await search(parsed);
    return res.json(rows);
  } catch (e: any) {
    console.error("[/transactions] Error:", e);
    return res
      .status(500)
      .json({ error: e.message || "Internal Server Error" });
  }
});

export default router;
