// // src/pages/PurchaseBill.tsx
// import { useState, useEffect, useCallback } from "react";
// import api from "../lib/axios";
// import { formatRupiah } from "../lib/utils";
// import { 
//   FileText, Search, PlusCircle, X, Loader2, CheckCircle2 
// } from "lucide-react";

// type Supplier = { id: number; name: string; };
// type PurchaseItem = { id: number; product_sku: string; quantity: number; price: number; sub_total: number; product: { name: string; unit: string; } };
// type Purchase = { id: number; date: string; due_date: string; reference_no: string; contact: Supplier; total: number; status: string; items: PurchaseItem[] };

// export default function PurchaseBillPage() {
//   const [bills, setBills] = useState<Purchase[]>([]);
//   const [readyDeliveries, setReadyDeliveries] = useState<Purchase[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedDelivery, setSelectedDelivery] = useState<Purchase | null>(null);
//   const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const [billRes, delRes] = await Promise.all([
//         api.get('/purchases?status=Tagihan'),     // Ambil data yang sudah jadi Tagihan
//         api.get('/purchases?status=Pengiriman')   // Ambil data yang siap ditagih (status Pengiriman)
//       ]);
//       setBills(billRes.data.data || []);
//       setReadyDeliveries(delRes.data.data || []);
//     } catch (error) {
//       console.error("Gagal mengambil data tagihan:", error);
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

//   const handleCreateBill = async () => {
//     if (!selectedDelivery) return;

//     setIsProcessing(true);
//     try {
//       await api.put(`/purchases/${selectedDelivery.id}/bill`, { due_date: dueDate });
//       alert("Tagihan Pembelian berhasil dibuat dan Jurnal Akuntansi tercatat otomatis!");
//       setIsModalOpen(false);
//       setSelectedDelivery(null);
//       fetchData();
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Gagal membuat tagihan");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const filteredBills = bills.filter(b => 
//     b.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     b.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6 pb-10 relative">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
//             <FileText className="text-blue-600" size={28} /> Tagihan Pembelian (Bills)
//           </h1>
//           <p className="text-slate-500 mt-1">Kelola tagihan utang dari supplier dan jurnal akuntansi otomatis</p>
//         </div>
//         <button 
//           onClick={() => { setSelectedDelivery(null); setIsModalOpen(true); }}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
//         >
//           <PlusCircle size={18} /> Buat Tagihan Baru
//         </button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
//           <div className="relative w-full sm:w-80">
//             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input 
//               type="text" placeholder="Cari No. Referensi atau Supplier..." 
//               className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[1000px]">
//             <thead className="bg-white border-b border-slate-200">
//               <tr>
//                 <th className="p-4 text-sm font-semibold text-slate-600">No. Referensi</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Supplier</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Tgl Tagihan</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Jatuh Tempo</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">Total Tagihan</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr><td colSpan={6} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
//               ) : filteredBills.length === 0 ? (
//                 <tr><td colSpan={6} className="p-8 text-center text-slate-500">Belum ada tagihan pembelian.</td></tr>
//               ) : (
//                 filteredBills.map((bill) => (
//                   <tr key={bill.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
//                     <td className="p-4 text-sm font-bold text-slate-800">{bill.reference_no || `PO #${bill.id}`}</td>
//                     <td className="p-4 text-sm font-medium text-blue-700">{bill.contact.name}</td>
//                     <td className="p-4 text-sm text-slate-600">{new Date(bill.date).toLocaleDateString('id-ID')}</td>
//                     <td className="p-4 text-sm text-red-600 font-medium">{new Date(bill.due_date).toLocaleDateString('id-ID')}</td>
//                     <td className="p-4 text-sm font-bold text-slate-800 text-right">{formatRupiah(bill.total)}</td>
//                     <td className="p-4 text-center">
//                       <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-max mx-auto">
//                         <CheckCircle2 size={14} /> Tagihan Aktif
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MODAL BUAT TAGIHAN */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
//             <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
//               <h3 className="text-xl font-bold text-slate-800">Terbitkan Tagihan Pembelian (Bill)</h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
//             </div>
            
//             <div className="flex flex-col flex-1 overflow-hidden">
//               <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Penerimaan Barang (Status: Pengiriman)</label>
//                     <select 
//                       className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                       value={selectedDelivery?.id || ""} onChange={handleSelectDelivery}
//                     >
//                       <option value="" disabled>-- Pilih Dokumen Pengiriman Barang --</option>
//                       {readyDeliveries.map(d => (
//                         <option key={d.id} value={d.id}>
//                           {d.reference_no ? `[${d.reference_no}]` : `[PO #${d.id}]`} - {d.contact.name} (Total: {formatRupiah(d.total)})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Jatuh Tempo</label>
//                     <input type="date" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//                       value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
//                   </div>
//                 </div>

//                 {selectedDelivery && (
//                   <div>
//                     <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Rincian Tagihan Barang</h4>
//                     <table className="w-full text-left border-collapse border border-slate-300">
//                       <thead className="bg-slate-100">
//                         <tr>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold w-12 text-center">No</th>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold">Nama Produk</th>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold text-center">Qty</th>
//                           <th className="p-2 border border-slate-300 text-sm font-semibold text-right">Harga Satuan</th>
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
//                           <td colSpan={4} className="p-3 border border-slate-300 text-right">TOTAL UTANG:</td>
//                           <td className="p-3 border border-slate-300 text-right text-blue-700 text-lg">{formatRupiah(selectedDelivery.total)}</td>
//                         </tr>
//                       </tfoot>
//                     </table>
//                   </div>
//                 )}
//               </div>

//               <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
//                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors">Batal</button>
//                 <button 
//                   onClick={handleCreateBill} 
//                   disabled={isProcessing || !selectedDelivery} 
//                   className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
//                 >
//                   {isProcessing ? <Loader2 size={18} className="animate-spin" /> : "Terbitkan Tagihan & Jurnal"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/PurchaseBill.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { 
  FileText, Search, PlusCircle, X, Loader2, CheckCircle2 
} from "lucide-react";

type Supplier = { id: number; name: string; };
type PurchaseItem = { id: number; product_sku: string; quantity: number; price: number; sub_total: number; product: { name: string; unit: string; } };
type Purchase = { id: number; date: string; due_date: string; reference_no: string; contact: Supplier; total: number; status: string; items: PurchaseItem[] };
type Bank = { id: string; nama: string; };

export default function PurchaseBillPage() {
  const [bills, setBills] = useState<Purchase[]>([]);
  const [readyDeliveries, setReadyDeliveries] = useState<Purchase[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Purchase | null>(null);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentAccount, setPaymentAccount] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [billRes, delRes, bankRes] = await Promise.all([
        api.get('/purchases?status=Tagihan'),     
        api.get('/purchases?status=Pengiriman'),   
        api.get('/banks') // Tarik data rekening bank
      ]);
      setBills(billRes.data.data || []);
      setReadyDeliveries(delRes.data.data || []);
      setBanks(bankRes.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data tagihan:", error);
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

  const handleCreateBill = async () => {
    if (!selectedDelivery) return;
    if (!paymentAccount) {
      alert("Harap pilih Akun Bank Pembayaran!");
      return;
    }

    setIsProcessing(true);
    try {
      await api.put(`/purchases/${selectedDelivery.id}/bill`, { 
        due_date: dueDate,
        payment_account: paymentAccount 
      });
      alert("Tagihan berhasil diproses! Dana telah dipotong dari rekening Bank terpilih.");
      setIsModalOpen(false);
      setSelectedDelivery(null);
      setPaymentAccount("");
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal membuat tagihan");
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredBills = bills.filter(b => 
    b.reference_no.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <FileText className="text-blue-600" size={28} /> Tagihan & Pembayaran
          </h1>
          <p className="text-slate-500 mt-1">Kelola tagihan supplier dan potong saldo bank otomatis</p>
        </div>
        <button 
          onClick={() => { setSelectedDelivery(null); setPaymentAccount(""); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <PlusCircle size={18} /> Proses Pembayaran Tagihan
        </button>
      </div>

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
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600">No. Referensi</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Supplier</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Tgl Lunas</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Total Dibayar</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : filteredBills.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Belum ada riwayat tagihan terbayar.</td></tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-bold text-slate-800">{bill.reference_no || `PO #${bill.id}`}</td>
                    <td className="p-4 text-sm font-medium text-blue-700">{bill.contact.name}</td>
                    <td className="p-4 text-sm text-slate-600">{new Date(bill.due_date).toLocaleDateString('id-ID')}</td>
                    <td className="p-4 text-sm font-bold text-slate-800 text-right">{formatRupiah(bill.total)}</td>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Proses Pembayaran Tagihan</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Penerimaan Barang (Belum Lunas)</label>
                    <select 
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={selectedDelivery?.id || ""} onChange={handleSelectDelivery}
                    >
                      <option value="" disabled>-- Pilih Dokumen Pengiriman Barang --</option>
                      {readyDeliveries.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.reference_no ? `[${d.reference_no}]` : `[PO #${d.id}]`} - {d.contact.name} (Tagihan: {formatRupiah(d.total)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Bayar Dari Rekening (Kas/Bank)</label>
                      <select 
                        required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={paymentAccount} onChange={(e) => setPaymentAccount(e.target.value)}
                      >
                        <option value="" disabled>-- Pilih Sumber Dana --</option>
                        {banks.map(b => (
                          <option key={b.id} value={b.id}>[{b.id}] {b.nama}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Pembayaran</label>
                      <input type="date" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                  </div>
                </div>

                {selectedDelivery && (
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Rincian Tagihan Barang</h4>
                    <table className="w-full text-left border-collapse border border-slate-300">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="p-2 border border-slate-300 text-sm font-semibold w-12 text-center">No</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold">Nama Produk</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold text-center">Qty</th>
                          <th className="p-2 border border-slate-300 text-sm font-semibold text-right">Harga Satuan</th>
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
                          <td colSpan={4} className="p-3 border border-slate-300 text-right">TOTAL DIBAYAR:</td>
                          <td className="p-3 border border-slate-300 text-right text-blue-700 text-lg">{formatRupiah(selectedDelivery.total)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-bold transition-colors">Batal</button>
                <button 
                  onClick={handleCreateBill} 
                  disabled={isProcessing || !selectedDelivery || !paymentAccount} 
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  {isProcessing ? <Loader2 size={18} className="animate-spin" /> : "Bayar Tagihan Sekarang"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}