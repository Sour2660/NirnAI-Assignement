import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tamil PDF Transaction Extractor",
  description: "Parse, translate & search Tamil real-estate transactions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-blue-600 text-white">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <span className="font-bold">NirnAI Assignemnet</span>
            <div className="space-x-4 text-sm">
              <Link href="/" className="hover:underline">Login</Link>
              <Link href="/upload" className="hover:underline">Upload</Link>
              <Link href="/results" className="hover:underline">Results</Link>
            </div>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
