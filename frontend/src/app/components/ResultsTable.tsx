"use client";

type Row = {
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

export default function ResultsTable({ rows, onRowClick }: { rows: Row[]; onRowClick?: (r: Row) => void }) {
  return (
    <div className="bg-white rounded shadow overflow-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Doc No</th>
            <th className="p-2 text-left">Doc Date</th>
            <th className="p-2 text-left">Buyer (TA / EN)</th>
            <th className="p-2 text-left">Seller (TA / EN)</th>
            <th className="p-2 text-left">Survey No</th>
            <th className="p-2 text-left">House No</th>
            <th className="p-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick?.(r)}
            >
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.documentNo}</td>
              <td className="p-2">{r.documentDate}</td>
              <td className="p-2">{r.buyerNameTa} / {r.buyerNameEn}</td>
              <td className="p-2">{r.sellerNameTa} / {r.sellerNameEn}</td>
              <td className="p-2">{r.surveyNo}</td>
              <td className="p-2">{r.houseNo}</td>
              <td className="p-2">{r.considerationValue ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}