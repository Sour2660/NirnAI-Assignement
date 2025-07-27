import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { env } from "../env.js";

const router = Router();

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

router.post("/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { username, password } = parsed.data;
  if (username === env.LOGIN_USERNAME && password === env.LOGIN_PASSWORD) {
    const token = jwt.sign({ sub: username }, env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    return res.json({ ok: true });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

export default router;