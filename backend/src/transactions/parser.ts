import pdf from "pdf-parse";
import { TamilRow } from "./types.js";


const taOrEn = (s?: string | null) => (s && s.trim().length ? s.trim() : null);

function pickAfter(lines: string[], regex: RegExp, window = 5): string | null {
  const idx = lines.findIndex((l) => regex.test(l));
  if (idx === -1) return null;
  for (let i = idx + 1; i < Math.min(lines.length, idx + 1 + window); i++) {
    const v = lines[i].trim();
    if (v) return v.replace(/^[:\-–]+/, "").trim();
  }
  return null;
}

function pickSameLine(lines: string[], regex: RegExp): string | null {
  const l = lines.find((line) => regex.test(line));
  if (!l) return null;
  const [, after] = l.split(/[:\-–]/, 2);
  return after?.trim() || null;
}

function normalizeAmount(str?: string | null): string | null {
  if (!str) return null;
  const num = str.replace(/[^0-9.]/g, "");
  return num || null;
}

function findDate(lines: string[]): string | null {
  const line = lines.find((l) => /\d{2}[-/]\w{3}[-/]\d{4}|\d{2}[-/]\d{2}[-/]\d{4}/.test(l));
  if (!line) return null;
  const m = line.match(/(\d{2})[-/](\w{3}|\d{2})[-/](\d{4})/);
  if (!m) return null;
  
  return `${m[0]}`;
}

export async function parseTamilPdf(buffer: Buffer): Promise<TamilRow[]> {
  const data = await pdf(buffer);
  const text = data.text;
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  console.log("[parser] Extracted lines:", lines.slice(0, 80));

  
  const documentNo = taOrEn(
    pickAfter(lines, /(Document\s*No\.?\s*&\s*Year|ஆவண\s*எண்)/i) ??
      pickSameLine(lines, /(Document\s*No\.?\s*&\s*Year|ஆவண\s*எண்)/i)
  );

  const considerationValue = taOrEn(
    normalizeAmount(
      pickAfter(lines, /(Consideration\s*Value|பரிவர்த்தனை\s*மதிப்பு)/i) ??
        pickSameLine(lines, /(Consideration\s*Value|பரிவர்த்தனை\s*மதிப்பு)/i)
    )
  );

  const surveyNo = taOrEn(
    pickAfter(lines, /(Survey\s*Details?|சர்வே\s*விவரம்)/i) ??
      pickSameLine(lines, /(Survey\s*Details?|சர்வே\s*விவரம்)/i)
  );

  const buyerTa = taOrEn(
    pickAfter(lines, /(Name\s*of\s*Claimant\(s\)|பெறுநர்)/i) ??
      pickSameLine(lines, /(Name\s*of\s*Claimant\(s\)|பெறுநர்)/i)
  );

  const sellerTa = taOrEn(
    pickAfter(lines, /(Name\s*of\s*Executant\(s\)|விற்பவர்|இயக்குநர்)/i) ??
      pickSameLine(lines, /(Name\s*of\s*Executant\(s\)|விற்பவர்|இயக்குநர்)/i)
  );

  const documentDate =
    taOrEn(
      pickAfter(lines, /(Date\s*of\s*Execution\s*&\s*Date|Registration\s*Date|செயல்படுத்தும்\s*தேதி)/i)
    ) || findDate(lines);

 
  const row: TamilRow = {
    buyerNameTa: buyerTa,
    sellerNameTa: sellerTa,
    houseNo: null, 
    surveyNo,
    documentNo,
    documentDate, 
    considerationValue,
    raw: lines.slice(0, 200),
  };

  
  const nonNulls = [
    row.buyerNameTa,
    row.sellerNameTa,
    row.documentNo,
    row.surveyNo,
    row.considerationValue,
  ].filter(Boolean).length;

  if (nonNulls === 0) {
    console.warn("[parser] No meaningful fields extracted; returning empty array");
    return [];
  }

  return [row];
}