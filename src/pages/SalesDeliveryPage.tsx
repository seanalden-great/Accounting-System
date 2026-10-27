// src/pages/SalesDelivery.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { 
  Send, Search, Truck, X, Loader2, PackageMinus 
} from "lucide-react";

// Tipe Data
type Customer = { id: number; name: string; };
type SaleItem = { id: number; product_sku: string; quantity: number; price: number; sub_total: number; product: { name: string; unit: string; } };
type Sale = { id: number; date: string; reference_no: string; contact: Customer; total: number; status: string; items: SaleItem[] };

export default function SalesDeliveryPage() {
  const [deliveries, setDeliveries] = useState<Sale[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSO, setSelectedSO] = useState<Sale | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [delRes, soRes] = await Promise.all([
        api.get('/sales?status=Pengiriman'), // Ambil riwayat pengiriman
        api.get('/sales?status=Pesanan')     // Ambil SO yang siap dikirim
      ]);
      setDeliveries(delRes.data.data || []);
      setPendingOrders(soRes.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectSO = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const soId = Number(e.target.value);
    const so = pendingOrders.find(p => p.id === soId);
    setSelectedSO(so || null);
  };

  const handleProcessDelivery = async () => {
    if (!selectedSO) return;
    
    setIsProcessing(true);
    try {
      await api.put(`/sales/${selectedSO.id}/deliver`);
      alert("Barang berhasil dikirim! Stok gudang telah dikurangi secara otomatis.");
      setIsModalOpen(false);
      setSelectedSO(null);
      fetchData(); 
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal memproses pengiriman barang. Pastikan stok mencukupi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredDeliveries = deliveries.filter(d => 
    d.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10 relative">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Truck className="text-purple-600" size={28} /> Pengiriman Penjualan
          </h1>
          <p className="text-slate-500 mt-1">Kirim barang ke Pelanggan dan otomatis kurangi stok gudang</p>
        </div>
        <button 
          onClick={() => { setSelectedSO(null); setIsModalOpen(true); }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Send size={18} /> Proses Pengiriman Barang
        </button>
      </div>

      {/* TABEL RIWAYAT PENGIRIMAN */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari No. Referensi atau Pelanggan..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600 w-16 text-center">ID</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Tanggal SO</th>
                <th className="p-4 text-sm font-semibold text-slate-600">No. Referensi SO</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Pelanggan</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : filteredDeliveries.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Belum ada barang yang dikirim.</td></tr>
              ) : (
                filteredDeliveries.map((del) => (
                  <tr key={del.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-center font-bold text-slate-400">#{del.id}</td>
                    <td className="p-4 text-sm text-slate-700">{new Date(del.date).toLocaleDateString('id-ID')}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{del.reference_no || '-'}</td>
                    <td className="p-4 text-sm font-medium text-indigo-700">{del.contact.name}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-max mx-auto">
                        <PackageMinus size={14} /> Terkirim
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PROSES PENGIRIMAN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Kirim Barang Pesanan (Delivery Order)</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                
                <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                  <label className="block text-sm font-bold text-indigo-900 mb-2">Pilih Pesanan (SO) yang Akan Dikirim</label>
                  <select 
                    className="w-full border border-indigo-200 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
                    value={selectedSO?.id || ""} onChange={handleSelectSO}
                  >
                    <option value="" disabled>-- Pilih Dokumen SO yang berstatus 'Pesanan' --</option>
                    {pendingOrders.map(so => (
                      <option key={so.id} value={so.id}>
                        {so.reference_no ? `[${so.reference_no}] ` : `[SO #${so.id}] `} 
                        - {so.contact.name} (Tgl: {new Date(so.date).toLocaleDateString('id-ID')})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSO && (
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Rincian Barang yang Keluar dari Gudang</h4>
                    <table className="w-full text-left border-collapse border border-slate-300">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-2 border border-slate-300 text-sm font-semibold w-12 text-center">No</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold">SKU / Nama Produk</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold text-center">Kuantitas</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold text-right">Harga Jual</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSO.items.map((item, idx) => (
                          <tr key={idx} className="bg-red-50/30">
                            <td className="p-2 border border-slate-300 text-center text-sm">{idx + 1}</td>
                            <td className="p-2 border border-slate-300 text-sm">
                              <span className="font-mono font-bold text-slate-600 mr-2">[{item.product_sku}]</span>
                              {item.product?.name || 'Unknown Product'}
                            </td>
                            <td className="p-2 border border-slate-300 text-center text-sm font-bold text-red-600">
                              - {item.quantity} {item.product?.unit}
                            </td>
                            <td className="p-2 border border-slate-300 text-right text-sm">
                              {formatRupiah(item.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800 flex gap-2">
                      <div className="font-bold">Info Sistem:</div>
                      <div>
                        Menyelesaikan proses ini akan otomatis <b>mengurangi Stok Gudang</b> Anda. Transaksi ini belum menghasilkan jurnal piutang hingga Anda menerbitkan Tagihan (Invoice).
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors">Batal</button>
                <button 
                  onClick={handleProcessDelivery} 
                  disabled={isProcessing || !selectedSO} 
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Kirim & Kurangi Stok</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}