import { useState } from "react";
import { formatRupiah } from "../lib/utils";
import { Plus, Building2 } from "lucide-react";

export default function TableMutasiBank() {
  const [daftarBank] = useState([
    { id: "111", nama: "BANK BCA", rek: "5193336999" },
    { id: "112", nama: "BANK BRI", rek: "021102000141306" },
    { id: "113", nama: "BANK MANDIRI", rek: "1410099887766" },
  ]);

  const [bankTerpilih, setBankTerpilih] = useState(daftarBank[0].id);
  const detailBank = daftarBank.find((b) => b.id === bankTerpilih) || daftarBank[0];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Building2 size={20} />
          </div>
          <label className="font-semibold text-slate-700 whitespace-nowrap">Pilih Buku Bank:</label>
          <select
            className="w-full sm:w-64 border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
            value={bankTerpilih}
            onChange={(e) => setBankTerpilih(e.target.value)}
          >
            {daftarBank.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.nama} - {bank.rek}
              </option>
            ))}
          </select>
        </div>

        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} /> Tambah Bank Baru
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold font-sans uppercase">
            {detailBank.nama} No. REK. {detailBank.rek}
          </h2>
          <p className="text-sm font-semibold mt-1 text-slate-600">Saldo Awal Januari 2026</p>
        </div>

        <table className="w-full text-sm border-collapse border border-slate-400 min-w-[900px]">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-400 p-2 text-center w-12">No.</th>
              <th className="border border-slate-400 p-2 text-center w-28">Tanggal</th>
              <th className="border border-slate-400 p-2 text-center">Uraian / Keterangan</th>
              <th className="border border-slate-400 p-2 text-center w-24">No. AKUN</th>
              <th className="border border-slate-400 p-2 text-center w-36">DEBET</th>
              <th className="border border-slate-400 p-2 text-center w-36">KREDIT</th>
              <th className="border border-slate-400 p-2 text-center w-36">SISA SALDO</th>
              <th className="border-y border-slate-400 p-2 w-4 bg-white"></th>
              <th className="border border-slate-400 p-2 text-center w-48">NAMA AKUN</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="border border-slate-400 p-2 text-center">1</td>
              <td className="border border-slate-400 p-2 text-center">04-Jan-2026</td>
              <td className="border border-slate-400 p-2">Penjualan Beras - INV 002/BRS/BMP/I/2026</td>
              <td className="border border-slate-400 p-2 text-center font-semibold">{detailBank.id}</td>
              <td className="border border-slate-400 p-2 text-right font-medium">{formatRupiah(1500000)}</td>
              <td className="border border-slate-400 p-2 text-right"></td>
              <td className="border border-slate-400 p-2 text-right font-bold text-blue-600">{formatRupiah(1500000)}</td>
              <td className="border-y border-slate-400 p-2 bg-white"></td>
              <td className="border border-slate-400 p-2 text-slate-600 font-medium">
                {detailBank.nama} {detailBank.rek}
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition-colors">
              <td className="border border-slate-400 p-2 text-center">2</td>
              <td className="border border-slate-400 p-2 text-center">04-Jan-2026</td>
              <td className="border border-slate-400 p-2">Penjualan Beras - INV 002/BRS/BMP/I/2026</td>
              <td className="border border-slate-400 p-2 text-center font-semibold">509</td>
              <td className="border border-slate-400 p-2 text-right"></td>
              <td className="border border-slate-400 p-2 text-right font-medium">{formatRupiah(1500000)}</td>
              <td className="border border-slate-400 p-2 text-right font-medium"></td>
              <td className="border-y border-slate-400 p-2 bg-white"></td>
              <td className="border border-slate-400 p-2 text-slate-600">Pendapatan Penjualan</td>
            </tr>

            <tr>
              <td className="border border-slate-400 p-2 text-center text-slate-400">3</td>
              <td className="border border-slate-400 p-0">
                <input type="date" className="w-full p-2 outline-none focus:bg-blue-50 text-sm" />
              </td>
              <td className="border border-slate-400 p-0">
                <input type="text" placeholder="Ketik uraian..." className="w-full p-2 outline-none focus:bg-blue-50 text-sm" />
              </td>
              <td className="border border-slate-400 p-0">
                <input type="text" placeholder="Akun..." className="w-full p-2 outline-none focus:bg-blue-50 text-center font-semibold text-sm" />
              </td>
              <td className="border border-slate-400 p-0">
                <input type="number" placeholder="0" className="w-full p-2 outline-none focus:bg-blue-50 text-right text-sm" />
              </td>
              <td className="border border-slate-400 p-0">
                <input type="number" placeholder="0" className="w-full p-2 outline-none focus:bg-blue-50 text-right text-sm" />
              </td>
              <td className="border border-slate-400 p-2 bg-slate-50"></td>
              <td className="border-y border-slate-400 p-2 bg-white"></td>
              <td className="border border-slate-400 p-2 bg-slate-50 text-slate-400 italic text-sm">Otomatis Terisi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}