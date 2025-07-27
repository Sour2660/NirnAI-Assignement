
# NirmAI Assignment – Tamil PDF Data Extraction & Translation App

This project is a full-stack web application that extracts data from Tamil PDF documents, translates it into English, and stores the structured information in a PostgreSQL database. It provides a user-friendly interface to upload PDFs, view extracted records, and perform searches.

---

## **Key Features**
- **PDF Upload & Parsing:** Extracts text content from Tamil PDF documents using `pdf-parse`.
- **Data Translation:** Converts Tamil text into English (via Google Translate API or fallback mode).
- **Database Storage:** Inserts extracted and translated data into a PostgreSQL database with proper schema.
- **Search & Filter:** Search transactions by buyer name, seller name, document number, survey number, and date range.
- **Modern Frontend:** Built using **Next.js** with support for **Tailwind CSS** for a clean UI.
- **Backend API:** Built with **Express.js**, **TypeScript**, and **Drizzle ORM** for robust database queries.
- **Authentication:** Basic login flow with username and password.
- **Results Dashboard:** View all parsed records in a tabular format.

---

 **Tech Stack**
**Frontend:**
- Next.js (React Framework)
- TypeScript
- Tailwind CSS (UI Styling)
- Axios (API Requests)

Backend:
- Node.js with Express.js
- TypeScript
- Drizzle ORM
- Multer (for file uploads)

### **Database:**
- PostgreSQL

---

## **How It Works**
1. User logs in using the web interface.
2. User uploads a Tamil PDF file.
3. The backend parses the PDF, extracts key fields (Buyer Name, Seller Name, Document No, etc.).
4. Tamil text is optionally translated into English.
5. Data is stored in a PostgreSQL database.
6. User can view all inserted records via the **Results** page.

---

## **Setup Instructions**
### **1. Backend Setup**
```bash
cd backend
npm install
npm run dev
```

### **2. Frontend Setup**
```bash
cd frontend/web
npm install
npm run dev
```

### **3. Environment Variables**
Create `.env` files for both backend and frontend with:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

---

Future Enhancements**
- Advanced Tamil-to-English translation with better accuracy.
- Export results as CSV/Excel.
- Role-based authentication (Admin/User).
- Cloud storage for uploaded PDFs.

---
 Git Commit Message Suggestion:**
```
Initial Commit: Added full-stack Tamil PDF parsing and translation project with Next.js, Express, PostgreSQL, and Drizzle ORM.
```
