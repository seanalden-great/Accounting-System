// src/pages/SalesOrder.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { 
  Plus, Search, Trash2, ShoppingBag, X, Loader2, Save 
} from "lucide-react";

// Tipe Data
type Customer = { id: number; name: string; };
type Product = { sku: string; name: string; unit: string; sell_price: number; }; // Menggunakan sell_price
type SaleItem = { product_sku: string; quantity: number; price: number; sub_total: number; product?: Product };
type Sale = { id: number; date: string; reference_no: string; contact: Customer; total: number; status: string; items: SaleItem[] };

export default function SalesOrderPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
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
  
  const [formItems, setFormItems] = useState<SaleItem[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [salesRes, custRes, prodRes] = await Promise.all([
        api.get('/sales?status=Pesanan'),      // Ambil SO yang statusnya 'Pesanan'
        api.get('/contacts?type=Customer'),    // Hanya ambil Pelanggan
        api.get('/products')                   // Ambil semua produk
      ]);
      setSales(salesRes.data.data || []);
      setCustomers(custRes.data.data || []);
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

  const handleAddItem = () => {
    setFormItems([...formItems, { product_sku: "", quantity: 1, price: 0, sub_total: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...formItems];
    newItems.splice(index, 1);
    setFormItems(newItems);
  };

  const handleItemChange = (index: number, field: keyof SaleItem, value: any) => {
    const newItems = [...formItems];
    const item = newItems[index];

    if (field === "product_sku") {
      item.product_sku = value;
      // Otomatis tarik harga JUAL dari master produk
      const selectedProduct = products.find(p => p.sku === value);
      if (selectedProduct) {
        // Sesuaikan nama properti jika backend mengembalikan sellPrice alih-alih sell_price
        item.price = selectedProduct.sell_price || (selectedProduct as any).sellPrice || 0;
      }
    } else if (field === "quantity" || field === "price") {
      item[field] = Number(value);
    }

    item.sub_total = item.quantity * item.price;
    setFormItems(newItems);
  };

  const grandTotal = formItems.reduce((sum, item) => sum + item.sub_total, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact_id) return alert("Pilih Pelanggan terlebih dahulu!");
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

      await api.post('/sales', payload);
      setIsModalOpen(false);
      
      setFormData({ date: new Date().toISOString().split('T')[0], due_date: "", reference_no: "", contact_id: "", notes: "" });
      setFormItems([]);
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menyimpan Pesanan Penjualan");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredSales = sales.filter(s => 
    s.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10 relative">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShoppingBag className="text-indigo-600" size={28} /> Pesanan Penjualan (SO)
          </h1>
          <p className="text-slate-500 mt-1">Buat dokumen pesanan barang dari Pelanggan (Customer)</p>
        </div>
        <button 
          onClick={() => { setFormItems([]); setIsModalOpen(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Buat SO Baru
        </button>
      </div>

      {/* TABEL LIST SO */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari No. Referensi atau Pelanggan..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
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
                <th className="p-4 text-sm font-semibold text-slate-600">Pelanggan</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Total Penjualan</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : filteredSales.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Belum ada pesanan penjualan.</td></tr>
              ) : (
                filteredSales.map((so) => (
                  <tr key={so.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-700">{new Date(so.date).toLocaleDateString('id-ID')}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{so.reference_no || '-'}</td>
                    <td className="p-4 text-sm font-medium text-indigo-700">{so.contact.name}</td>
                    <td className="p-4 text-sm font-bold text-slate-800 text-right">{formatRupiah(so.total)}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                        {so.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL BUAT SO BARU */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Buat Pesanan Penjualan Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Pelanggan</label>
                    <select required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.contact_id} onChange={(e) => setFormData({...formData, contact_id: e.target.value})}>
                      <option value="" disabled>-- Pilih Customer --</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Pesanan</label>
                    <input type="date" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">No. Referensi / PO Customer</label>
                    <input type="text" placeholder="SO-2026-001" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.reference_no} onChange={(e) => setFormData({...formData, reference_no: e.target.value})} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-slate-800">Detail Barang yang Dipesan</h4>
                    <button type="button" onClick={handleAddItem} className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors">
                      <Plus size={16} /> Tambah Baris
                    </button>
                  </div>
                  
                  <table className="w-full text-left border-collapse border border-slate-300">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-2 border border-slate-300 text-sm font-semibold w-12 text-center">No</th>
                        <th className="p-2 border border-slate-300 text-sm font-semibold">Pilih Produk</th>
                        <th className="p-2 border border-slate-300 text-sm font-semibold w-24 text-center">Kuantitas</th>
                        <th className="p-2 border border-slate-300 text-sm font-semibold w-40 text-right">Harga Jual</th>
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
                        <td className="p-3 border border-slate-300 text-right text-indigo-700 text-lg">{formatRupiah(grandTotal)}</td>
                        <td className="border border-slate-300"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Catatan Penjualan</label>
                  <textarea rows={2} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Instruksi pengiriman atau permintaan khusus..." />
                </div>
              </div>

              <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors">Batal</button>
                <button type="submit" disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Simpan Pesanan (SO)</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}