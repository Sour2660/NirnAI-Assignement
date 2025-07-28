"use client";

import { api } from "@/app/lib/api";
import { isLoggedIn } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Filters, { FiltersState } from "../components/Filters";
import ResultsTable from "../components/ResultsTable";


type Tx = {
  id: number;
  buyerNameTa: string | null;
  buyerNameEn: string | null;
  sellerNameTa: string | null;
  sellerNameEn: string | null;
  houseNo: string | null;
  surveyNo: string | null;
  documentNo: string | null;
  documentDate: string | null;
  considerationValue: number | null;
  rawJson?: any;
};

export default function ResultsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Tx | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
      return;
    }
    load();
 
  }, []);

  async function load(filters?: FiltersState) {
    setLoading(true);
    const res = await api.get<Tx[]>("/transactions", { params: filters });
    setRows(res.data);
    setSelected(null);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Results</h1>

      <Filters onSearch={load} />

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No data</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <ResultsTable rows={rows} onRowClick={setSelected} />
          
        </div>
      )}
    </div>
  );
}

