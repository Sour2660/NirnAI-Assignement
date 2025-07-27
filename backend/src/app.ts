import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/auth.routes.js";
import txRoutes from "./transactions/tx.routes.js";
import pdfRoutes from "./pdf/pdf.routes.js"; 
import { requireAuth } from "./auth/auth.middleware.js";

export function createApp() {
  const app = express();

  app.use(cors({
    origin: true,
    credentials: true
  }));
  app.use(cookieParser());
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/auth", authRoutes);
  app.use("/transactions", requireAuth, txRoutes);
  app.use("/pdf", pdfRoutes); 

  return app;
}
