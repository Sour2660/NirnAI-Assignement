# NirnAI-Assignement-
This full-stack web application extracts structured information from Tamil real estate registration PDF documents. The application supports uploading a PDF, extracting key fields  translating them to English, storing the data in a PostgreSQL database, and displaying it on a user-friendly UI with search and filter options.

# (Nirnai Project)

This full-stack application allows users to upload Tamil PDF land records, automatically parse and translate them into English, and search historical transaction data with filters.

---

##  Features

### 🔍 PDF Upload and Processing
- Upload Tamil land record PDFs.
- Parse key fields like buyer, seller, house number, survey number, document date, value.
- Translate Tamil names into English using AI.
- Store parsed data in PostgreSQL.

###  Frontend (Next.js + Tailwind CSS)
- PDF Upload UI
- Transaction Search Form
- Display of uploaded records with filters and navigation
- Modern UI with responsiveness

###  Backend (Node.js + Express + Drizzle ORM)
- PDF Parsing (`pdf-parse`)
- AI-based Translation (Mock or OpenAI)
- Database integration with PostgreSQL
- RESTful API for upload/search

---

## Project Structure
---

## 🛠️ Tech Stack

| Frontend      | Backend      | Database     |
|---------------|--------------|--------------|
| Next.js       | Express.js   | PostgreSQL   |
| Tailwind CSS  | Node.js      | Drizzle ORM  |
| Axios         | PDF-Parse    |              |

---

##  Installation

### 🖥 Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev

## **Credentials**
UserName : Demo
Password : Demo123
