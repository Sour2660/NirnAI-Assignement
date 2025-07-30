import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  buyer_name_ta: text("buyer_name_ta"),
  buyer_name_en: text("buyer_name_en"),
  seller_name_ta: text("seller_name_ta"),
  seller_name_en: text("seller_name_en"),
  house_no: text("house_no"),
  survey_no: text("survey_no"),
  document_no: text("document_no"),
  document_date: text("document_date"),
  consideration_value: text("consideration_value"),
  raw_json: text("raw_json"),
  created_at: text("created_at"),
});