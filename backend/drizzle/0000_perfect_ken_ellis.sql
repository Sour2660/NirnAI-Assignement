CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"buyer_name_ta" text,
	"buyer_name_en" text,
	"seller_name_ta" text,
	"seller_name_en" text,
	"house_no" text,
	"survey_no" text,
	"document_no" text,
	"document_date" text,
	"consideration_value" text,
	"raw_json" text,
	"created_at" text
);
