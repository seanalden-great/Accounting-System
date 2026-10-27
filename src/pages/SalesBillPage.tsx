// // src/pages/SalesBill.tsx
// import { useState, useEffect, useCallback } from "react";
// import api from "../lib/axios";
// import { formatRupiah } from "../lib/utils";
// import { 
//   Receipt, Search, PlusCircle, X, Loader2, CheckCircle2 
// } from "lucide-react";

// // Tipe Data
// type Customer = { id: number; name: string; };
// type SaleItem = { id: number; product_sku: string; quantity: number; price: number; sub_total: number; product: { name: string; unit: string; } };
// type Sale = { id: number; date: string; due_date: string; reference_no: string; contact: Customer; total: number; status: string; items: SaleItem[] };

// export default function SalesBillPage() {
//   const [invoices, setInvoices] = useState<Sale[]>([]);
//   const [readyDeliveries, setReadyDeliveries] = useState<Sale[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedDelivery, setSelectedDelivery] = useState<Sale | null>(null);

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const [invRes, delRes] = await Promise.all([
//         api.get('/sales?status=Tagihan'),     // Ambil data yang sudah jadi Tagihan/Invoice
//         api.get('/sales?status=Pengiriman')   // Ambil data yang siap ditagih (status Pengiriman)
//       ]);
//       setInvoices(invRes.data.data || []);
//       setReadyDeliveries(delRes.data.data || []);
//     } catch (error) {
//       console.error("Gagal mengambil data invoice:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleSelectDelivery = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const id = Number(e.target.value);
//     const found = readyDeliveries.find(d => d.id === id);
//     setSelectedDelivery(found || null);
//   };

//   const handleCreateInvoice = async () => {
//     if (!selectedDelivery) return;

//     setIsProcessing(true);
//     try {
//       await api.put(`/sales/${selectedDelivery.id}/invoice`);
//       alert("Tagihan Penjualan berhasil diterbitkan! Jurnal Piutang, Pendapatan, dan HPP telah tercatat otomatis di Buku Besar.");
//       setIsModalOpen(false);
//       setSelectedDelivery(null);
//       fetchData();
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Gagal membuat invoice penjualan");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const filteredInvoices = invoices.filter(inv => 
//     inv.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     inv.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6 pb-10 relative">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
//             <Receipt className="text-rose-600" size={28} /> Tagihan Penjualan (Invoice)
//           </h1>
//           <p className="text-slate-500 mt-1">Terbitkan invoice ke pelanggan dan otomatis catat jurnal pendapatan</p>
//         </div>
//         <button 
//           onClick={() => { setSelectedDelivery(null); setIsModalOpen(true); }}
//           className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
//         >
//           <PlusCircle size={18} /> Buat Invoice Baru
//         </button>
//       </div>

//       {/* TABEL LIST INVOICE */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
//           <div className="relative w-full sm:w-80">
//             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input 
//               type="text" placeholder="Cari No. Referensi atau Pelanggan..." 
//               className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-rose-500"
//               value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[1000px]">
//             <thead className="bg-white border-b border-slate-200">
//               <tr>
//                 <th className="p-4 text-sm font-semibold text-slate-600">No. Referensi</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Pelanggan</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Tgl Pesanan</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">Total Tagihan</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr><td colSpan={5} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
//               ) : filteredInvoices.length === 0 ? (
//                 <tr><td colSpan={5} className="p-8 text-center text-slate-500">Belum ada tagihan penjualan.</td></tr>
//               ) : (
//                 filteredInvoices.map((inv) => (
//                   <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
//                     <td className="p-4 text-sm font-bold text-slate-800">{inv.reference_no || `SO #${inv.id}`}</td>
//                     <td className="p-4 text-sm font-medium text-rose-700">{inv.contact.name}</td>
//                     <td className="p-4 text-sm text-slate-600">{new Date(inv.date).toLocaleDateString('id-ID')}</td>
//                     <td className="p-4 text-sm font-bold text-slate-800 text-right">{formatRupiah(inv.total)}</td>
//                     <td className="p-4 text-center">
//                       <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-max mx-auto">
//                         <CheckCircle2 size={14} /> Piutang Aktif
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MODAL BUAT INVOICE */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
//             <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
//               <h3 className="text-xl font-bold text-slate-800">Terbitkan Invoice Penjualan</h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
//             </div>
            
//             <div className="flex flex-col flex-1 overflow-hidden">
//               <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                
//                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
//                   <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Pengiriman Barang (Status: Pengiriman)</label>
//                   <select 
//                     className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-rose-500 bg-white"
//                     value={selectedDelivery?.id || ""} onChange={handleSelectDelivery}
//                   >
//                     <option value="" disabled>-- Pilih Dokumen Pengiriman Barang --</option>
//                     {readyDeliveries.map(d => (
//                       <option key={d.id} value={d.id}>
//                         {d.reference_no ? `[${d.reference_no}]` : `[SO #${d.id}]`} - {d.contact.name} (Total: {formatRupiah(d.total)})
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {selectedDelivery && (
//                   <div>
//                     <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Rincian Tagihan ke Pelanggan</h4>
//                     <table className="w-full text-left border-collapse border border-slate-300">
//                       <thead className="bg-slate-100">
//                         <tr>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold w-12 text-center">No</th>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold">Nama Produk</th>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold text-center">Qty</th>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold text-right">Harga Jual</th>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold text-right">Subtotal</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {selectedDelivery.items.map((item, idx) => (
//                           <tr key={idx}>
//                             <td className="p-2 border border-slate-300 text-center text-sm">{idx + 1}</td>
//                             <td className="p-2 border border-slate-300 text-sm">{item.product?.name}</td>
//                             <td className="p-2 border border-slate-300 text-center text-sm">{item.quantity} {item.product?.unit}</td>
//                             <td className="p-2 border border-slate-300 text-right text-sm">{formatRupiah(item.price)}</td>
//                             <td className="p-2 border border-slate-300 text-right text-sm font-bold">{formatRupiah(item.sub_total)}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                       <tfoot className="bg-slate-50 font-bold">
//                         <tr>
//                           <td colSpan={4} className="p-3 border border-slate-300 text-right">TOTAL PIUTANG PELANGGAN:</td>
//                           <td className="p-3 border border-slate-300 text-right text-rose-700 text-lg">{formatRupiah(selectedDelivery.total)}</td>
//                         </tr>
//                       </tfoot>
//                     </table>

//                     <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex gap-2">
//                       <div className="font-bold">Info Akuntansi:</div>
//                       <div>
//                         Menyelesaikan proses ini akan otomatis membuat <b>2 Pasang Jurnal</b>: <br/>
//                         1. <b>Debit:</b> Piutang Usaha | <b>Kredit:</b> Pendapatan Penjualan<br/>
//                         2. <b>Debit:</b> Harga Pokok Penjualan (HPP) | <b>Kredit:</b> Persediaan Barang
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
//                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors">Batal</button>
//                 <button 
//                   onClick={handleCreateInvoice} 
//                   disabled={isProcessing || !selectedDelivery} 
//                   className="bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
//                 >
//                   {isProcessing ? <Loader2 size={18} className="animate-spin" /> : "Terbitkan Invoice & Jurnal"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/SalesBill.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { 
  Receipt, Search, PlusCircle, X, Loader2, CheckCircle2 
} from "lucide-react";

// Tipe Data
type Customer = { id: number; name: string; };
type SaleItem = { id: number; product_sku: string; quantity: number; price: number; sub_total: number; product: { name: string; unit: string; } };
type Bank = { id: string; nama: string; };
type Sale = { 
  id: number; date: string; due_date: string; reference_no: string; 
  contact: Customer; total: number; status: string; items: SaleItem[];
  payment_account?: { name: string; };
};

export default function SalesBillPage() {
  const [invoices, setInvoices] = useState<Sale[]>([]);
  const [readyDeliveries, setReadyDeliveries] = useState<Sale[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Sale | null>(null);
  const [paymentAccount, setPaymentAccount] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [invRes, delRes, bankRes] = await Promise.all([
        api.get('/sales?status=Tagihan'),     
        api.get('/sales?status=Pengiriman'),
        api.get('/banks') // Tarik data Bank
      ]);
      setInvoices(invRes.data.data || []);
      setReadyDeliveries(delRes.data.data || []);
      setBanks(bankRes.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data invoice:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectDelivery = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    const found = readyDeliveries.find(d => d.id === id);
    setSelectedDelivery(found || null);
  };

  const handleCreateInvoice = async () => {
    if (!selectedDelivery) return;
    if (!paymentAccount) {
      alert("Harap pilih Rekening Bank Penerima Dana!");
      return;
    }

    setIsProcessing(true);
    try {
      await api.put(`/sales/${selectedDelivery.id}/invoice`, {
        payment_account: paymentAccount
      });
      alert("Tagihan Penjualan lunas! Saldo masuk ke Rekening Bank dan Jurnal Akuntansi otomatis tercatat.");
      setIsModalOpen(false);
      setSelectedDelivery(null);
      setPaymentAccount("");
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal memproses pembayaran invoice");
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10 relative">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Receipt className="text-rose-600" size={28} /> Invoice & Penerimaan Dana
          </h1>
          <p className="text-slate-500 mt-1">Terbitkan invoice penjualan tunai dan otomatis tambah saldo rekening bank</p>
        </div>
        <button 
          onClick={() => { setSelectedDelivery(null); setPaymentAccount(""); setIsModalOpen(true); }}
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <PlusCircle size={18} /> Terima Pembayaran Invoice
        </button>
      </div>

      {/* TABEL LIST INVOICE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari No. Referensi atau Pelanggan..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-rose-500"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600">No. Referensi</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Pelanggan</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Tgl Lunas</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Bank Penerima Dana</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Total Diterima</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : filteredInvoices.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Belum ada tagihan penjualan terbayar.</td></tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-800">{inv.reference_no || `SO #${inv.id}`}</td>
                    <td className="p-4 text-sm font-medium text-rose-700">{inv.contact.name}</td>
                    <td className="p-4 text-sm text-slate-600">{new Date(inv.date).toLocaleDateString('id-ID')}</td>
                    <td className="p-4 text-sm font-bold text-slate-700">
                      {inv.payment_account ? inv.payment_account.name : <span className="text-slate-400 italic">Tidak Tercatat</span>}
                    </td>
                    <td className="p-4 text-sm font-bold text-slate-800 text-right">{formatRupiah(inv.total)}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-max mx-auto">
                        <CheckCircle2 size={14} /> Lunas
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TERIMA PEMBAYARAN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Terima Pembayaran Invoice Penjualan</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                
                <div className="bg-rose-50 p-5 rounded-lg border border-rose-100 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Pengiriman Barang (Belum Lunas)</label>
                    <select 
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                      value={selectedDelivery?.id || ""} onChange={handleSelectDelivery}
                    >
                      <option value="" disabled>-- Pilih Dokumen Pengiriman Barang --</option>
                      {readyDeliveries.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.reference_no ? `[${d.reference_no}]` : `[SO #${d.id}]`} - {d.contact.name} (Total: {formatRupiah(d.total)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Simpan Dana ke Rekening (Kas/Bank)</label>
                    <select 
                      required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                      value={paymentAccount} onChange={(e) => setPaymentAccount(e.target.value)}
                    >
                      <option value="" disabled>-- Pilih Rekening Penerima --</option>
                      {banks.map(b => (
                        <option key={b.id} value={b.id}>[{b.id}] {b.nama}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedDelivery && (
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Rincian Penjualan Barang</h4>
                    <table className="w-full text-left border-collapse border border-slate-300">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-2 border border-slate-300 text-sm font-semibold w-12 text-center">No</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold">Nama Produk</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold text-center">Qty</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold text-right">Harga Jual</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDelivery.items.map((item, idx) => (
                          <tr key={idx}>
                            <td className="p-2 border border-slate-300 text-center text-sm">{idx + 1}</td>
                            <td className="p-2 border border-slate-300 text-sm">{item.product?.name}</td>
                            <td className="p-2 border border-slate-300 text-center text-sm">{item.quantity} {item.product?.unit}</td>
                            <td className="p-2 border border-slate-300 text-right text-sm">{formatRupiah(item.price)}</td>
                            <td className="p-2 border border-slate-300 text-right text-sm font-bold">{formatRupiah(item.sub_total)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-slate-50 font-bold">
                        <tr>
                          <td colSpan={4} className="p-3 border border-slate-300 text-right">TOTAL DANA DITERIMA:</td>
                          <td className="p-3 border border-slate-300 text-right text-rose-700 text-lg">{formatRupiah(selectedDelivery.total)}</td>
                        </tr>
                      </tfoot>
                    </table>

                    <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-800 flex gap-2">
                      <div className="font-bold">Info Akuntansi:</div>
                      <div>
                        Menyelesaikan proses ini akan otomatis membuat <b>2 Pasang Jurnal</b> ke Buku Besar: <br/>
                        1. <b>Debit:</b> Kas/Bank Terpilih | <b>Kredit:</b> Pendapatan Penjualan<br/>
                        2. <b>Debit:</b> Beban Pokok Penjualan (HPP) | <b>Kredit:</b> Persediaan Barang
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors">Batal</button>
                <button 
                  onClick={handleCreateInvoice} 
                  disabled={isProcessing || !selectedDelivery || !paymentAccount} 
                  className="bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  {isProcessing ? <Loader2 size={18} className="animate-spin" /> : "Terima Pembayaran & Jurnal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}