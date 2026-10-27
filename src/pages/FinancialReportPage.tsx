// src/pages/FinancialReports.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { LineChart, BarChart3, Scale } from "lucide-react";

type AccountBalance = { code: string; name: string; type: string; balance: number; };

export default function FinancialReportPage() {
  const location = useLocation();
  const isProfitLoss = location.pathname.includes("profit-loss");
  
  const [accounts, setAccounts] = useState<AccountBalance[]>([]);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/reports');
        setAccounts(res.data.data || []);
        setNetProfit(res.data.net_profit || 0);
      } catch (error) {
        console.error("Gagal mengambil laporan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
  }, []);

  // Filter Akun
  const revenues = accounts.filter(a => a.type === "Pendapatan");
  const cogs = accounts.filter(a => a.type === "HPP");
  const expenses = accounts.filter(a => a.type === "Beban");
  
  const assets = accounts.filter(a => a.type === "Harta");
  const liabilities = accounts.filter(a => a.type === "Kewajiban");
  const equities = accounts.filter(a => a.type === "Modal");

  const totalRevenues = revenues.reduce((s, a) => s + a.balance, 0);
  const totalCogs = cogs.reduce((s, a) => s + a.balance, 0);
  const totalExpenses = expenses.reduce((s, a) => s + a.balance, 0);
  const grossProfit = totalRevenues - totalCogs;

  const totalAssets = assets.reduce((s, a) => s + a.balance, 0);
  const totalLiabilities = liabilities.reduce((s, a) => s + a.balance, 0);
  const totalEquities = equities.reduce((s, a) => s + a.balance, 0);
  const liabilitiesAndEquity = totalLiabilities + totalEquities + netProfit;

  if (isLoading) return <div className="p-10 text-center text-slate-500">Menyusun laporan keuangan...</div>;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            {isProfitLoss ? <BarChart3 className="text-blue-600" size={28} /> : <Scale className="text-emerald-600" size={28} />}
            {isProfitLoss ? "Laporan Laba Rugi" : "Neraca Keuangan (Balance Sheet)"}
          </h1>
          <p className="text-slate-500 mt-1">PT Berlianmandiri Perkasa</p>
        </div>
      </div>

      {isProfitLoss ? (
        /* --- TAMPILAN LABA RUGI --- */
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-4xl">
          <div className="space-y-6">
            {/* PENDAPATAN */}
            <div>
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-3">Pendapatan</h3>
              {revenues.map(a => (
                <div key={a.code} className="flex justify-between py-1.5 text-sm">
                  <span className="text-slate-600">[{a.code}] {a.name}</span>
                  <span className="font-medium text-slate-800">{formatRupiah(a.balance)}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 mt-2 font-bold bg-slate-50 px-3 rounded">
                <span>Total Pendapatan</span><span className="text-blue-700">{formatRupiah(totalRevenues)}</span>
              </div>
            </div>

            {/* HPP */}
            <div>
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-3">Harga Pokok Penjualan (HPP)</h3>
              {cogs.map(a => (
                <div key={a.code} className="flex justify-between py-1.5 text-sm">
                  <span className="text-slate-600">[{a.code}] {a.name}</span>
                  <span className="font-medium text-slate-800">{formatRupiah(a.balance)}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 mt-2 font-bold bg-slate-50 px-3 rounded">
                <span>Total HPP</span><span className="text-orange-700">{formatRupiah(totalCogs)}</span>
              </div>
            </div>
            
            <div className="flex justify-between py-3 border-y-2 border-slate-800 font-bold text-lg">
              <span>LABA KOTOR</span><span>{formatRupiah(grossProfit)}</span>
            </div>

            {/* BEBAN OPERASIONAL */}
            <div>
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-3">Beban Operasional</h3>
              {expenses.map(a => (
                <div key={a.code} className="flex justify-between py-1.5 text-sm">
                  <span className="text-slate-600">[{a.code}] {a.name}</span>
                  <span className="font-medium text-slate-800">{formatRupiah(a.balance)}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 mt-2 font-bold bg-slate-50 px-3 rounded">
                <span>Total Beban</span><span className="text-red-700">{formatRupiah(totalExpenses)}</span>
              </div>
            </div>

            {/* LABA BERSIH */}
            <div className={`flex justify-between py-4 rounded-lg px-4 font-black text-xl ${netProfit >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
              <span>LABA (RUGI) BERSIH</span><span>{formatRupiah(netProfit)}</span>
            </div>
          </div>
        </div>
      ) : (
        /* --- TAMPILAN NERACA --- */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
          {/* KOLOM AKTIVA (HARTA) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-black text-xl text-slate-800 border-b-2 border-slate-800 pb-3 mb-4">AKTIVA (Harta)</h3>
            <div className="space-y-2 mb-6 min-h-[300px]">
              {assets.map(a => (
                <div key={a.code} className="flex justify-between py-1.5 text-sm">
                  <span className="text-slate-600">[{a.code}] {a.name}</span>
                  <span className="font-medium text-slate-800">{formatRupiah(a.balance)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between py-4 border-t-2 border-slate-800 font-black text-lg bg-slate-50 px-3 rounded-b">
              <span>TOTAL AKTIVA</span><span className="text-emerald-700">{formatRupiah(totalAssets)}</span>
            </div>
          </div>

          {/* KOLOM PASIVA (KEWAJIBAN & MODAL) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h3 className="font-black text-xl text-slate-800 border-b-2 border-slate-800 pb-3 mb-4">PASIVA (Kewajiban & Modal)</h3>
            
            <div className="flex-1 space-y-6">
              <div>
                <h4 className="font-bold text-slate-700 mb-2 border-b pb-1">Kewajiban (Utang)</h4>
                {liabilities.map(a => (
                  <div key={a.code} className="flex justify-between py-1.5 text-sm">
                    <span className="text-slate-600">[{a.code}] {a.name}</span>
                    <span className="font-medium text-slate-800">{formatRupiah(a.balance)}</span>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="font-bold text-slate-700 mb-2 border-b pb-1">Modal Ekuitas</h4>
                {equities.map(a => (
                  <div key={a.code} className="flex justify-between py-1.5 text-sm">
                    <span className="text-slate-600">[{a.code}] {a.name}</span>
                    <span className="font-medium text-slate-800">{formatRupiah(a.balance)}</span>
                  </div>
                ))}
                <div className="flex justify-between py-1.5 text-sm mt-2 font-bold text-blue-700">
                  <span>Laba Berjalan (Tahun Ini)</span>
                  <span>{formatRupiah(netProfit)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t-2 border-slate-800 font-black text-lg bg-slate-50 px-3 rounded-b mt-6">
              <span>TOTAL PASIVA</span><span className={totalAssets === liabilitiesAndEquity ? "text-emerald-700" : "text-red-600"}>
                {formatRupiah(liabilitiesAndEquity)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}