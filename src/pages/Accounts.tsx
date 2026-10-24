import { formatRupiah } from "../lib/utils";

export default function AccountsPage() {
  const coaData = [
    { code: "1", name: "AKTIVA", pos: "-", isHeader: true, level: 0 },
    { code: "10", name: "AKTIVA LANCAR", pos: "-", isHeader: true, level: 1 },
    { code: "100", name: "KAS", pos: "-", isHeader: true, level: 2 },
    { code: "101", name: "Kas Kecil", pos: "D", debit: 5000000, kredit: 0, sisa: 5000000, level: 3 },
    { code: "102", name: "Kas Utama", pos: "D", debit: 120000000, kredit: 0, sisa: 120000000, level: 3 },
    { code: "103", name: "Kas Ko Rey", pos: "D", debit: 15000000, kredit: 0, sisa: 15000000, level: 3 },
    { code: "110", name: "BANK", pos: "-", isHeader: true, level: 2 },
    { code: "111", name: "BCA 5193336999", pos: "D", debit: 250000000, kredit: 0, sisa: 250000000, level: 3 },
    { code: "112", name: "BRI 021102000141306", pos: "D", debit: 45000000, kredit: 0, sisa: 45000000, level: 3 },
    { code: "113", name: "BRI 009601004488304", pos: "D", debit: 10000000, kredit: 0, sisa: 10000000, level: 3 },
    { code: "114", name: "BRI BRITAMA 021101003124569", pos: "D", debit: 5000000, kredit: 0, sisa: 5000000, level: 3 },
    { code: "120", name: "SURAT BERHARGA", pos: "-", isHeader: true, level: 2 },
    { code: "121", name: "Deposito", pos: "D", debit: 500000000, kredit: 0, sisa: 500000000, level: 3 },
    { code: "122", name: "Deposito Valas", pos: "D", debit: 0, kredit: 0, sisa: 0, level: 3 },
    { code: "130", name: "PIUTANG USAHA", pos: "-", isHeader: true, level: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Chart of Accounts</h1>
          <p className="text-slate-500 mt-1">Kelola master data akun keuangan</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          + Tambah Akun Baru
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-xl font-bold font-sans">PT. BERLIAN MANDIRI PERKASA</h2>
          <p className="text-lg font-semibold mt-1">Chart of Account</p>
        </div>

        <table className="w-full text-sm border-collapse border border-slate-400 min-w-[800px]">
          <thead className="bg-slate-200">
            <tr>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center w-24">CoA</th>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center">Nama Account</th>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center w-16">Pos</th>
              <th colSpan={2} className="border border-slate-400 p-2 text-center">Saldo</th>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center w-40">SISA SALDO</th>
            </tr>
            <tr>
              <th className="border border-slate-400 p-2 text-center w-36 bg-slate-100">D</th>
              <th className="border border-slate-400 p-2 text-center w-36 bg-slate-100">K</th>
            </tr>
          </thead>
          <tbody>
            {coaData.map((acc, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className={`border border-slate-400 p-2 ${acc.isHeader ? 'font-bold' : ''}`}>
                  {acc.code}
                </td>
                <td className={`border border-slate-400 p-2 ${acc.isHeader ? 'font-bold' : ''}`} 
                    style={{ paddingLeft: `${(acc.level * 1.5) + 0.5}rem` }}>
                  {acc.name}
                </td>
                <td className="border border-slate-400 p-2 text-center font-medium">
                  {acc.pos}
                </td>
                <td className="border border-slate-400 p-2 text-right">
                  {acc.debit !== undefined ? formatRupiah(acc.debit) : ""}
                </td>
                <td className="border border-slate-400 p-2 text-right">
                  {acc.kredit !== undefined ? formatRupiah(acc.kredit) : ""}
                </td>
                <td className={`border border-slate-400 p-2 text-right ${acc.sisa && acc.sisa > 0 ? 'font-semibold text-blue-700' : ''}`}>
                  {acc.sisa !== undefined ? formatRupiah(acc.sisa) : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}