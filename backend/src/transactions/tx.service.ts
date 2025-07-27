import { db } from "../db/client.js";
import { transactions } from "../db/schema.js";
import { parseTamilPdf } from "./parser.js";
import { translateRows } from "./translator.js";
import { and, between, desc, eq, ilike } from "drizzle-orm";


const toDateOrNull = (s?: string | null) => {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};

const toNumberOrNull = (s?: string | null) => {
  if (!s) return null;
  const digits = s.replace(/[^\d]/g, ""); 
  if (!digits) return null;
  return Number(digits);
};


export async function processPdf(buffer: Buffer) {
  try {
    console.log("[processPdf] Parsing PDF...");
    const rowsTa = await parseTamilPdf(buffer);
    console.log(`[processPdf] Found ${rowsTa.length} rows`);

    if (!rowsTa.length) {
      return { insertedCount: 0, records: [] };
    }

    console.log("[processPdf] Translating rows...");
    const rows = await translateRows(rowsTa);

    
    console.log("Before Translation (Tamil):", rowsTa[0]);
    console.log("After Translation (English):", rows[0]);

    const toInsert = rows.map((r) => ({
      buyerNameTa: r.buyerNameTa ?? null,
      buyerNameEn: r.buyerNameEn ?? null,
      sellerNameTa: r.sellerNameTa ?? null,
      sellerNameEn: r.sellerNameEn ?? null,
      houseNo: r.houseNo ?? null,
      surveyNo: r.surveyNo ?? null,
      documentNo: r.documentNo ?? null,
      documentDate: toDateOrNull(r.documentDate),
      considerationValue: toNumberOrNull(r.considerationValue),
      rawJson: JSON.stringify(r.raw ?? {}),
    }));

    const valid = toInsert.filter(
      (r) =>
        r.buyerNameTa ||
        r.sellerNameTa ||
        r.documentNo ||
        r.surveyNo ||
        r.considerationValue
    );

    if (!valid.length) {
      console.warn("[processPdf] Nothing valid to insert");
      return { insertedCount: 0, records: [] };
    }

    console.log(`[processPdf] Inserting ${valid.length} records...`);
    const inserted = await db.insert(transactions).values(valid).returning();

    console.log("[processPdf] Inserted records count:", inserted.length);
    return { insertedCount: inserted.length, records: inserted };
  } catch (err: any) {
    console.error("[processPdf] Error:", err);
    throw new Error("Failed to process PDF: " + err.message);
  }
}

export async function search(params: any) {
  const {
    buyerName,
    sellerName,
    houseNo,
    surveyNo,
    documentNo,
    fromDate,
    toDate,
    limit = 100,
  } = params;

  const conditions = [];

  if (buyerName) {
    conditions.push(ilike(transactions.buyerNameEn, `%${buyerName}%`));
  }

  if (sellerName) {
    conditions.push(ilike(transactions.sellerNameEn, `%${sellerName}%`));
  }

  if (houseNo) {
    conditions.push(ilike(transactions.houseNo, `%${houseNo}%`));
  }

  if (surveyNo) {
    conditions.push(ilike(transactions.surveyNo, `%${surveyNo}%`));
  }

  if (documentNo) {
    conditions.push(ilike(transactions.documentNo, `%${documentNo}%`));
  }

  if (fromDate || toDate) {
    const from = fromDate ? new Date(fromDate) : new Date("1900-01-01");
    const to = toDate ? new Date(toDate) : new Date();
    conditions.push(between(transactions.documentDate, from, to));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const results = await db
    .select()
    .from(transactions)
    .where(whereClause)
    .orderBy(desc(transactions.documentDate))
    .limit(limit);

  return results;
}
