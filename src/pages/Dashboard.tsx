import { formatRupiah } from "../lib/utils";
import { 
  Wallet, TrendingUp, TrendingDown, 
  Plus, FileText, Activity, ArrowRight, Building2, Receipt
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

export default function Dashboard() {
  const ringkasan = {
    pendapatan: 345000000,
    pengeluaran: 185000000,
    labaBersih: 160000000,
    piutang: 45000000,
    hutang: 12000000,
    totalKas: 215000000,
  };

  const dataArusKas = [
    { name: 'Jan', Pemasukan: 40000000, Pengeluaran: 24000000 },
    { name: 'Feb', Pemasukan: 30000000, Pengeluaran: 13980000 },
    { name: 'Mar', Pemasukan: 20000000, Pengeluaran: 48000000 },
    { name: 'Apr', Pemasukan: 27800000, Pengeluaran: 39080000 },
    { name: 'Mei', Pemasukan: 18900000, Pengeluaran: 48000000 },
    { name: 'Jun', Pemasukan: 23900000, Pengeluaran: 38000000 },
    { name: 'Jul', Pemasukan: 34900000, Pengeluaran: 43000000 },
  ];

  const saldoBank = [
    { nama: "BCA Utama", rek: "5193336999", saldo: 155000000 },
    { nama: "BRI Operasional", rek: "02110200014", saldo: 45000000 },
    { nama: "Kas Kecil", rek: "KAS-01", saldo: 15000000 },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Dashboard Keuangan</h2>
          <p className="text-slate-500 mt-1">Ringkasan bisnis PT Berlian Mandiri Perkasa (Bulan Ini)</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            <Receipt size={18} /> Tagihan
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
            <Plus size={18} /> Buat Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">Total Pendapatan</p>
          <h3 className="text-2xl font-bold text-green-600">{formatRupiah(ringkasan.pendapatan)}</h3>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <TrendingUp size={14} className="text-green-500" /> +12.5% dari bulan lalu
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">Total Pengeluaran</p>
          <h3 className="text-2xl font-bold text-red-600">{formatRupiah(ringkasan.pengeluaran)}</h3>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <TrendingDown size={14} className="text-red-500" /> -2.4% dari bulan lalu
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-semibold mb-2">Laba Bersih</p>
          <h3 className="text-2xl font-bold text-blue-600">{formatRupiah(ringkasan.labaBersih)}</h3>
          <p className="text-xs text-slate-400 mt-2">Periode berjalan</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <p className="text-sm text-slate-300 font-semibold mb-2 flex items-center gap-2">
            <Wallet size={16} /> Saldo Kas & Bank
          </p>
          <h3 className="text-2xl font-bold">{formatRupiah(ringkasan.totalKas)}</h3>
          <p className="text-xs text-slate-400 mt-2">Siap digunakan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
            <Activity size={20} className="text-blue-600" /> Arus Kas (6 Bulan Terakhir)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataArusKas} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} 
                       tickFormatter={(value) => `Rp ${value / 1000000}M`} />
                <Tooltip 
                  formatter={(value: any) => formatRupiah(Number(value))}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey="Pemasukan" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Pengeluaran" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-slate-500 font-medium text-sm">Piutang Belum Dibayar</span>
              <span className="font-bold text-slate-800">{formatRupiah(ringkasan.piutang)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium text-sm">Hutang Jatuh Tempo</span>
              <span className="font-bold text-red-600">{formatRupiah(ringkasan.hutang)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Building2 size={18} className="text-blue-600" /> Rekening Bank
              </h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">Lihat Semua</button>
            </div>
            <div className="p-0">
              {saldoBank.map((bank, index) => (
                <div key={index} className="p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">{bank.nama}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{bank.rek}</p>
                  </div>
                  <p className="font-bold text-slate-800 text-sm">{formatRupiah(bank.saldo)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <FileText size={20} className="text-blue-600" /> Transaksi Terakhir
          </h3>
          <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
            Lihat Jurnal <ArrowRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold">No. Referensi</th>
                <th className="p-4 font-semibold">Keterangan</th>
                <th className="p-4 font-semibold text-right">Nominal</th>
                <th className="p-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm">24 Okt 2026</td>
                <td className="p-4 text-sm font-mono text-blue-600">INV-2026/10/01</td>
                <td className="p-4 text-sm">Pembayaran Pelunasan Invoice PT Maju Jaya</td>
                <td className="p-4 text-sm font-bold text-green-600 text-right">+ {formatRupiah(15000000)}</td>
                <td className="p-4 text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Selesai</span>
                </td>
              </tr>
              <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm">23 Okt 2026</td>
                <td className="p-4 text-sm font-mono text-blue-600">EXP-2026/10/12</td>
                <td className="p-4 text-sm">Pembelian ATK Kantor dan Tinta Printer</td>
                <td className="p-4 text-sm font-bold text-slate-800 text-right">- {formatRupiah(1250000)}</td>
                <td className="p-4 text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Selesai</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm">21 Okt 2026</td>
                <td className="p-4 text-sm font-mono text-blue-600">BILL-2026/10/05</td>
                <td className="p-4 text-sm">Tagihan Internet & Telepon (Indihome)</td>
                <td className="p-4 text-sm font-bold text-slate-800 text-right">- {formatRupiah(2500000)}</td>
                <td className="p-4 text-center">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">Tertunda</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}