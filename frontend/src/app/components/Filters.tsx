"use client";

import { useState } from "react";

export type FiltersState = {
  buyerName?: string;
  sellerName?: string;
  houseNo?: string;
  surveyNo?: string;
  documentNo?: string;
  fromDate?: string;
  toDate?: string;
};

export default function Filters({ onSearch }: { onSearch: (f: FiltersState) => void }) {
  const [form, setForm] = useState<FiltersState>({});

  function update(name: keyof FiltersState, value: string) {
    setForm((p) => ({ ...p, [name]: value || undefined }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(form);
      }}
      className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-3"
    >
      <input className="border rounded p-2" placeholder="Buyer Name"
        onChange={(e) => update("buyerName", e.target.value)} />
      <input className="border rounded p-2" placeholder="Seller Name"
        onChange={(e) => update("sellerName", e.target.value)} />
      <input className="border rounded p-2" placeholder="House No"
        onChange={(e) => update("houseNo", e.target.value)} />
      <input className="border rounded p-2" placeholder="Survey No"
        onChange={(e) => update("surveyNo", e.target.value)} />
      <input className="border rounded p-2" placeholder="Document No"
        onChange={(e) => update("documentNo", e.target.value)} />
      <div className="flex items-center gap-2">
        <input type="date" className="border rounded p-2 w-full"
          onChange={(e) => update("fromDate", e.target.value)} />
        <span>to</span>
        <input type="date" className="border rounded p-2 w-full"
          onChange={(e) => update("toDate", e.target.value)} />
      </div>

      <div className="md:col-span-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
    </form>
  );
}