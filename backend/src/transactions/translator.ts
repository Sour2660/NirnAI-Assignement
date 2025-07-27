import translate from "@iamtraction/google-translate";
import { TamilRow, Row } from "./types.js";

async function safeTranslate(text?: string): Promise<string | undefined> {
  if (!text) return undefined;
  try {
    const result = await translate(text, { from: "ta", to: "en" });
    return result.text;
  } catch (err) {
    console.warn(`[Translation Failed] "${text}":`, err);
    return text; 
  }
}

export async function translateRows(rows: TamilRow[]): Promise<Row[]> {
  const translatedRows: Row[] = [];

  for (const row of rows) {
    const translated: Row = {
      ...row,
      buyerNameEn: await safeTranslate(row.buyerNameTa),
      sellerNameEn: await safeTranslate(row.sellerNameTa),
      houseNoEn: await safeTranslate(row.houseNo),
      surveyNoEn: await safeTranslate(row.surveyNo),
      documentNoEn: await safeTranslate(row.documentNo),
      documentDateEn: await safeTranslate(row.documentDate),
      considerationValueEn: await safeTranslate(row.considerationValue),
    };
    translatedRows.push(translated);
  }

  return translatedRows;
}
