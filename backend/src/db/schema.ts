import { pgTable, serial, text, varchar, timestamp, numeric, date, index } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey().notNull(),
  buyerNameTa: text("buyer_name_ta"),
  buyerNameEn: text("buyer_name_en"),
  sellerNameTa: text("seller_name_ta"),
  sellerNameEn: text("seller_name_en"),
  houseNo: varchar("house_no", { length: 64 }),
  surveyNo: varchar("survey_no", { length: 128 }),
  documentNo: varchar("document_no", { length: 128 }),
  documentDate: date("document_date"),
  considerationValue: numeric("consideration_value"),
  rawJson: text("raw_json"),
  createdAt: timestamp("created_at").defaultNow()
}, (t) => ({
  idxBuyer: index("idx_transactions_buyer_en").on(t.buyerNameEn),
  idxSeller: index("idx_transactions_seller_en").on(t.sellerNameEn),
  idxSurvey: index("idx_transactions_survey").on(t.surveyNo),
  idxDoc: index("idx_transactions_doc_no").on(t.documentNo),
}));