// src/pages/PurchaseOrder.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { 
  Plus, Search, Trash2, ShoppingCart, X, Loader2, Save 
} from "lucide-react";

// Tipe Data
type Supplier = { id: number; name: string; };
type Product = { sku: string; name: string; unit: string; buyPrice: number; };
type PurchaseItem = { product_sku: string; quantity: number; price: number; sub_total: number; product?: Product };
type Purchase = { id: number; date: string; reference_no: string; contact: Supplier; total: number; status: string; items: PurchaseItem[] };

export default function PurchaseOrderPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    due_date: "",
    reference_no: "",
    contact_id: "",
    notes: ""
  });
  
  // State khusus untuk tabel keranjang barang
  const [formItems, setFormItems] = useState<PurchaseItem[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [purRes, supRes, prodRes] = await Promise.all([
        api.get('/purchases?status=Pesanan'), // Hanya ambil yang statusnya Pesanan
        api.get('/contacts?type=Supplier'),   // Hanya ambil Pemasok
        api.get('/products')                  // Ambil semua produk
      ]);
      setPurchases(purRes.data.data || []);
      setSuppliers(supRes.data.data || []);
      setProducts(prodRes.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fungsi untuk menambah baris kosong di tabel keranjang
  const handleAddItem = () => {
    setFormItems([...formItems, { product_sku: "", quantity: 1, price: 0, sub_total: 0 }]);
  };

  // Fungsi untuk menghapus baris di keranjang
  const handleRemoveItem = (index: number) => {
    const newItems = [...formItems];
    newItems.splice(index, 1);
    setFormItems(newItems);
  };

  // Fungsi dinamis saat input di tabel keranjang berubah
  const handleItemChange = (index: number, field: keyof PurchaseItem, value: any) => {
    const newItems = [...formItems];
    const item = newItems[index];

    if (field === "product_sku") {
      item.product_sku = value;
      // Otomatis isi harga beli dari master produk
      const selectedProduct = products.find(p => p.sku === value);
      if (selectedProduct) {
        item.price = selectedProduct.buyPrice;
      }
    } else if (field === "quantity" || field === "price") {
      item[field] = Number(value);
    }

    // Kalkulasi subtotal per baris
    item.sub_total = item.quantity * item.price;
    setFormItems(newItems);
  };

  const grandTotal = formItems.reduce((sum, item) => sum + item.sub_total, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact_id) return alert("Pilih Supplier terlebih dahulu!");
    if (formItems.length === 0) return alert("Keranjang pesanan masih kosong!");
    if (formItems.some(item => !item.product_sku || item.quantity < 1)) return alert("Pastikan semua baris barang telah terisi dengan benar!");

    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        contact_id: Number(formData.contact_id),
        items: formItems.map(item => ({
          product_sku: item.product_sku,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await api.post('/purchases', payload);
      setIsModalOpen(false);
      
      // Reset Form
      setFormData({ date: new Date().toISOString().split('T')[0], due_date: "", reference_no: "", contact_id: "", notes: "" });
      setFormItems([]);
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menyimpan Pesanan Pembelian");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPurchases = purchases.filter(p => 
    p.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10 relative">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShoppingCart className="text-orange-500" size={28} /> Pesanan Pembelian (PO)
          </h1>
          <p className="text-slate-500 mt-1">Buat dokumen pemesanan barang ke Pemasok/Supplier</p>
        </div>
        <button 
          onClick={() => { setFormItems([]); setIsModalOpen(true); }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Buat PO Baru
        </button>
      </div>

      {/* TABEL LIST PO */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari No. Referensi atau Supplier..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600">Tanggal</th>
                <th className="p-4 text-sm font-semibold text-slate-600">No. Referensi</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Supplier</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Total Transaksi</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : filteredPurchases.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Belum ada pesanan pembelian.</td></tr>
              ) : (
                filteredPurchases.map((po) => (
                  <tr key={po.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-700">{new Date(po.date).toLocaleDateString('id-ID')}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{po.reference_no || '-'}</td>
                    <td className="p-4 text-sm font-medium text-blue-700">{po.contact.name}</td>
                    <td className="p-4 text-sm font-bold text-slate-800 text-right">{formatRupiah(po.total)}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL BUAT PO BARU */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Buat Pesanan Pembelian Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                
                {/* Bagian Header Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Supplier</label>
                    <select required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.contact_id} onChange={(e) => setFormData({...formData, contact_id: e.target.value})}>
                      <option value="" disabled>-- Pilih Pemasok --</option>
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Pesanan</label>
                    <input type="date" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">No. Referensi (Opsional)</label>
                    <input type="text" placeholder="PO-2026-001" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.reference_no} onChange={(e) => setFormData({...formData, reference_no: e.target.value})} />
                  </div>
                </div>

                {/* Tabel Keranjang Barang */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-slate-800">Detail Pesanan Barang</h4>
                    <button type="button" onClick={handleAddItem} className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors">
                      <Plus size={16} /> Tambah Baris
                    </button>
                  </div>
                  
                  <table className="w-full text-left border-collapse border border-slate-300">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-2 border border-slate-300 text-sm font-semibold w-12 text-center">No</th>
                        <th className="p-2 border border-slate-300 text-sm font-semibold">Pilih Produk</th>
                        <th className="p-2 border border-slate-300 text-sm font-semibold w-24 text-center">Kuantitas</th>
                        <th className="p-2 border border-slate-300 text-sm font-semibold w-40 text-right">Harga Satuan</th>
                        <th className="p-2 border border-slate-300 text-sm font-semibold w-48 text-right">Subtotal</th>
                        <th className="p-2 border border-slate-300 text-sm font-semibold w-12 text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formItems.length === 0 ? (
                        <tr><td colSpan={6} className="p-6 text-center text-slate-400 text-sm italic border border-slate-300">Belum ada barang yang ditambahkan. Klik tombol "Tambah Baris".</td></tr>
                      ) : (
                        formItems.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-2 border border-slate-300 text-center text-sm">{idx + 1}</td>
                            <td className="p-1 border border-slate-300">
                              <select required className="w-full p-1.5 text-sm outline-none bg-transparent"
                                value={item.product_sku} onChange={(e) => handleItemChange(idx, "product_sku", e.target.value)}>
                                <option value="" disabled>Pilih Produk...</option>
                                {products.map(p => <option key={p.sku} value={p.sku}>[{p.sku}] {p.name}</option>)}
                              </select>
                            </td>
                            <td className="p-1 border border-slate-300">
                              <input type="number" min="1" required className="w-full p-1.5 text-sm text-center outline-none bg-transparent"
                                value={item.quantity || ''} onChange={(e) => handleItemChange(idx, "quantity", e.target.value)} />
                            </td>
                            <td className="p-1 border border-slate-300">
                              <input type="number" min="0" required className="w-full p-1.5 text-sm text-right outline-none bg-transparent"
                                value={item.price || ''} onChange={(e) => handleItemChange(idx, "price", e.target.value)} />
                            </td>
                            <td className="p-2 border border-slate-300 text-right text-sm font-semibold bg-slate-50">
                              {formatRupiah(item.sub_total)}
                            </td>
                            <td className="p-1 border border-slate-300 text-center">
                              <button type="button" onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-700 p-1 rounded"><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold">
                      <tr>
                        <td colSpan={4} className="p-3 border border-slate-300 text-right text-slate-700">GRAND TOTAL</td>
                        <td className="p-3 border border-slate-300 text-right text-blue-700 text-lg">{formatRupiah(grandTotal)}</td>
                        <td className="border border-slate-300"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Catatan Tambahan */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Catatan Pesanan</label>
                  <textarea rows={2} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Instruksi khusus untuk pemasok..." />
                </div>
              </div>

              {/* FOOTER ACTION */}
              <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors">Batal</button>
                <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Simpan Pesanan (PO)</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}