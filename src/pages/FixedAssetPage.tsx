// src/pages/FixedAssets.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { Briefcase, Plus, X, Loader2, Search, TrendingDown, CheckCircle2 } from "lucide-react";

type Account = { code: string; name: string; };
type FixedAsset = { id: number; name: string; purchase_date: string; purchase_price: number; useful_life: number; accum_depreciation: number; status: string; };

export default function FixedAssetPage() {
  const [assets, setAssets] = useState<FixedAsset[]>([]);
  const [cashAccounts, setCashAccounts] = useState<Account[]>([]);
  const [assetAccounts, setAssetAccounts] = useState<Account[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "", purchase_date: new Date().toISOString().split('T')[0], purchase_price: "", useful_life: "", payment_account: "", asset_account: ""
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [astRes, accRes] = await Promise.all([
        api.get('/fixed-assets'),
        api.get('/accounts')
      ]);
      setAssets(astRes.data.data || []);
      
      const allAccs = accRes.data.data || [];
      setCashAccounts(allAccs.filter((a: Account) => a.code.startsWith('111'))); // Kas/Bank
      setAssetAccounts(allAccs.filter((a: Account) => a.code.startsWith('121'))); // Aset Tetap
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.post('/fixed-assets', {
        ...formData,
        purchase_price: Number(formData.purchase_price),
        useful_life: Number(formData.useful_life)
      });
      setIsModalOpen(false);
      setFormData({ name: "", purchase_date: new Date().toISOString().split('T')[0], purchase_price: "", useful_life: "", payment_account: "", asset_account: "" });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal mendaftarkan aset");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDepreciate = async (id: number) => {
    if(!confirm("Proses penyusutan 1 bulan untuk aset ini? Jurnal akan otomatis dibuat.")) return;
    try {
      await api.put(`/fixed-assets/${id}/depreciate`);
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal memproses penyusutan");
    }
  };

  const filteredAssets = assets.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Briefcase className="text-slate-700" size={28} /> Aset Tetap (Fixed Assets)
          </h1>
          <p className="text-slate-500 mt-1">Kelola pembelian inventaris perusahaan dan jurnal penyusutan otomatis</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Beli Aset Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari nama aset..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-500"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600">Nama Aset</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Tgl Beli</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Beli</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Akumulasi Susut</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Nilai Buku</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : filteredAssets.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Belum ada aset tetap yang didaftarkan.</td></tr>
              ) : (
                filteredAssets.map((ast) => {
                  const bookValue = ast.purchase_price - ast.accum_depreciation;
                  return (
                    <tr key={ast.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="p-4 text-sm font-bold text-slate-800">{ast.name} <br/><span className="text-xs font-normal text-slate-400">Umur: {ast.useful_life} Bln</span></td>
                      <td className="p-4 text-sm text-slate-600">{new Date(ast.purchase_date).toLocaleDateString('id-ID')}</td>
                      <td className="p-4 text-sm text-right text-slate-800 font-medium">{formatRupiah(ast.purchase_price)}</td>
                      <td className="p-4 text-sm text-right text-red-600 font-medium">{formatRupiah(ast.accum_depreciation)}</td>
                      <td className="p-4 text-sm text-right text-emerald-700 font-bold">{formatRupiah(bookValue)}</td>
                      <td className="p-4 text-center">
                        {ast.status === 'Aktif' ? (
                          <button onClick={() => handleDepreciate(ast.id)} className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 w-full transition-colors">
                            <TrendingDown size={14}/> Susutkan
                          </button>
                        ) : (
                          <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 w-full">
                            <CheckCircle2 size={14}/> Lunas
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Daftarkan Aset Tetap Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Aset / Inventaris</label>
                <input type="text" required placeholder="Cth: MacBook Pro M3, Mobil Operasional..." className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Pembelian</label>
                  <input type="date" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                    value={formData.purchase_date} onChange={(e) => setFormData({...formData, purchase_date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Umur Ekonomis (Bulan)</label>
                  <div className="relative">
                    <input type="number" required min="1" placeholder="48" className="w-full pr-14 pl-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-500"
                      value={formData.useful_life} onChange={(e) => setFormData({...formData, useful_life: e.target.value})} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-slate-400">Bln</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Harga Beli Aset</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500">Rp</span>
                  <input type="number" required min="1" className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg font-bold text-lg outline-none focus:border-slate-500"
                    value={formData.purchase_price} onChange={(e) => setFormData({...formData, purchase_price: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Akun Aset (Debit)</label>
                  <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                    value={formData.asset_account} onChange={(e) => setFormData({...formData, asset_account: e.target.value})}>
                    <option value="" disabled>-- Pilih Akun 121 --</option>
                    {assetAccounts.map(a => <option key={a.code} value={a.code}>[{a.code}] {a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Bayar Dari (Kredit)</label>
                  <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-slate-500"
                    value={formData.payment_account} onChange={(e) => setFormData({...formData, payment_account: e.target.value})}>
                    <option value="" disabled>-- Pilih Kas/Bank --</option>
                    {cashAccounts.map(a => <option key={a.code} value={a.code}>[{a.code}] {a.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-bold">Batal</button>
                <button type="submit" disabled={isSaving} className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Simpan & Buat Jurnal Pembelian"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}