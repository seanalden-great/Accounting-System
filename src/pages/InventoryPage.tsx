// src/pages/Inventory.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { Archive, Plus, X, Loader2, ArrowUpRight, ArrowDownRight, Search } from "lucide-react";

type Product = { sku: string; name: string; unit: string; stock: number; hpp: number; };
type Adjustment = { id: number; date: string; product_sku: string; type: string; quantity: number; reason: string; total_value: number; product: Product; };

export default function InventoryPage() {
  const [adjustments, setAdjustments] = useState<Adjustment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    product_sku: "",
    type: "Penambahan",
    quantity: "",
    reason: ""
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [adjRes, prodRes] = await Promise.all([
        api.get('/inventory/adjustments'),
        api.get('/products')
      ]);
      setAdjustments(adjRes.data.data || []);
      setProducts(prodRes.data.data || []);
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
      await api.post('/inventory/adjust', {
        ...formData,
        quantity: Number(formData.quantity)
      });
      setIsModalOpen(false);
      setFormData({ date: new Date().toISOString().split('T')[0], product_sku: "", type: "Penambahan", quantity: "", reason: "" });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal melakukan penyesuaian stok");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredAdjustments = adjustments.filter(a => 
    a.product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.product_sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Archive className="text-teal-600" size={28} /> Inventori & Stock Opname
          </h1>
          <p className="text-slate-500 mt-1">Sesuaikan jumlah stok fisik dan otomatis catat selisih persediaan</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Penyesuaian Stok
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari SKU, produk, atau alasan..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-white border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Tanggal</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Produk</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-center">Tipe Penyesuaian</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-center">Selisih Qty</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-right">Nilai Barang</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Alasan</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
            ) : filteredAdjustments.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500">Belum ada riwayat penyesuaian stok.</td></tr>
            ) : (
              filteredAdjustments.map((adj) => (
                <tr key={adj.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="p-4 text-sm">{new Date(adj.date).toLocaleDateString('id-ID')}</td>
                  <td className="p-4 text-sm font-bold text-slate-700">[{adj.product_sku}] {adj.product.name}</td>
                  <td className="p-4 text-center">
                    {adj.type === 'Penambahan' ? 
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold"><ArrowUpRight size={14}/> Penambahan</span> : 
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold"><ArrowDownRight size={14}/> Pengurangan</span>
                    }
                  </td>
                  <td className="p-4 text-sm font-bold text-center">{adj.quantity} {adj.product.unit}</td>
                  <td className="p-4 text-sm font-medium text-slate-600 text-right">{formatRupiah(adj.total_value)}</td>
                  <td className="p-4 text-sm text-slate-500 italic">{adj.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Form Penyesuaian Stok (Stock Opname)</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input type="date" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-teal-900 mb-1">Pilih Produk</label>
                  <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.product_sku} onChange={(e) => setFormData({...formData, product_sku: e.target.value})}>
                    <option value="" disabled>-- Pilih Produk --</option>
                    {products.map(p => <option key={p.sku} value={p.sku}>[{p.sku}] {p.name} (Stok: {p.stock} {p.unit})</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-teal-50 p-4 rounded-lg border border-teal-100">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tipe Penyesuaian</label>
                  <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                    value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="Penambahan">➕ Penambahan Stok Masuk</option>
                    <option value="Pengurangan">➖ Pengurangan Stok Keluar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Kuantitas Selisih</label>
                  <input type="number" required min="1" placeholder="Berapa qty?" className="w-full border border-slate-300 rounded-lg p-2.5 text-center font-bold outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Alasan Penyesuaian</label>
                <textarea required rows={2} placeholder="Cth: Barang rusak, salah hitung di gudang, daluwarsa..." className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-bold">Batal</button>
                <button type="submit" disabled={isSaving} className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Sesuaikan Stok & Jurnal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}