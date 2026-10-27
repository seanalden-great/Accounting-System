// import { useState } from "react";
// import { formatRupiah } from "../lib/utils";
// import { Plus, Building2 } from "lucide-react";

// export default function TableMutasiBank() {
//   const [daftarBank] = useState([
//     { id: "111", nama: "BANK BCA", rek: "5193336999" },
//     { id: "112", nama: "BANK BRI", rek: "021102000141306" },
//     { id: "113", nama: "BANK MANDIRI", rek: "1410099887766" },
//   ]);

//   const [bankTerpilih, setBankTerpilih] = useState(daftarBank[0].id);
//   const detailBank = daftarBank.find((b) => b.id === bankTerpilih) || daftarBank[0];

//   return (
//     <div className="space-y-6">
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
//             <Building2 size={20} />
//           </div>
//           <label className="font-semibold text-slate-700 whitespace-nowrap">Pilih Buku Bank:</label>
//           <select
//             className="w-full sm:w-64 border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
//             value={bankTerpilih}
//             onChange={(e) => setBankTerpilih(e.target.value)}
//           >
//             {daftarBank.map((bank) => (
//               <option key={bank.id} value={bank.id}>
//                 {bank.nama} - {bank.rek}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
//           <Plus size={18} /> Tambah Bank Baru
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold font-sans uppercase">
//             {detailBank.nama} No. REK. {detailBank.rek}
//           </h2>
//           <p className="text-sm font-semibold mt-1 text-slate-600">Saldo Awal Januari 2026</p>
//         </div>

//         <table className="w-full text-sm border-collapse border border-slate-400 min-w-[900px]">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="border border-slate-400 p-2 text-center w-12">No.</th>
//               <th className="border border-slate-400 p-2 text-center w-28">Tanggal</th>
//               <th className="border border-slate-400 p-2 text-center">Uraian / Keterangan</th>
//               <th className="border border-slate-400 p-2 text-center w-24">No. AKUN</th>
//               <th className="border border-slate-400 p-2 text-center w-36">DEBET</th>
//               <th className="border border-slate-400 p-2 text-center w-36">KREDIT</th>
//               <th className="border border-slate-400 p-2 text-center w-36">SISA SALDO</th>
//               <th className="border-y border-slate-400 p-2 w-4 bg-white"></th>
//               <th className="border border-slate-400 p-2 text-center w-48">NAMA AKUN</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="hover:bg-slate-50 transition-colors">
//               <td className="border border-slate-400 p-2 text-center">1</td>
//               <td className="border border-slate-400 p-2 text-center">04-Jan-2026</td>
//               <td className="border border-slate-400 p-2">Penjualan Beras - INV 002/BRS/BMP/I/2026</td>
//               <td className="border border-slate-400 p-2 text-center font-semibold">{detailBank.id}</td>
//               <td className="border border-slate-400 p-2 text-right font-medium">{formatRupiah(1500000)}</td>
//               <td className="border border-slate-400 p-2 text-right"></td>
//               <td className="border border-slate-400 p-2 text-right font-bold text-blue-600">{formatRupiah(1500000)}</td>
//               <td className="border-y border-slate-400 p-2 bg-white"></td>
//               <td className="border border-slate-400 p-2 text-slate-600 font-medium">
//                 {detailBank.nama} {detailBank.rek}
//               </td>
//             </tr>

//             <tr className="hover:bg-slate-50 transition-colors">
//               <td className="border border-slate-400 p-2 text-center">2</td>
//               <td className="border border-slate-400 p-2 text-center">04-Jan-2026</td>
//               <td className="border border-slate-400 p-2">Penjualan Beras - INV 002/BRS/BMP/I/2026</td>
//               <td className="border border-slate-400 p-2 text-center font-semibold">509</td>
//               <td className="border border-slate-400 p-2 text-right"></td>
//               <td className="border border-slate-400 p-2 text-right font-medium">{formatRupiah(1500000)}</td>
//               <td className="border border-slate-400 p-2 text-right font-medium"></td>
//               <td className="border-y border-slate-400 p-2 bg-white"></td>
//               <td className="border border-slate-400 p-2 text-slate-600">Pendapatan Penjualan</td>
//             </tr>

//             <tr>
//               <td className="border border-slate-400 p-2 text-center text-slate-400">3</td>
//               <td className="border border-slate-400 p-0">
//                 <input type="date" className="w-full p-2 outline-none focus:bg-blue-50 text-sm" />
//               </td>
//               <td className="border border-slate-400 p-0">
//                 <input type="text" placeholder="Ketik uraian..." className="w-full p-2 outline-none focus:bg-blue-50 text-sm" />
//               </td>
//               <td className="border border-slate-400 p-0">
//                 <input type="text" placeholder="Akun..." className="w-full p-2 outline-none focus:bg-blue-50 text-center font-semibold text-sm" />
//               </td>
//               <td className="border border-slate-400 p-0">
//                 <input type="number" placeholder="0" className="w-full p-2 outline-none focus:bg-blue-50 text-right text-sm" />
//               </td>
//               <td className="border border-slate-400 p-0">
//                 <input type="number" placeholder="0" className="w-full p-2 outline-none focus:bg-blue-50 text-right text-sm" />
//               </td>
//               <td className="border border-slate-400 p-2 bg-slate-50"></td>
//               <td className="border-y border-slate-400 p-2 bg-white"></td>
//               <td className="border border-slate-400 p-2 bg-slate-50 text-slate-400 italic text-sm">Otomatis Terisi</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // src/components/TabelMutasiBank.tsx
// import { useState, useEffect } from "react";
// import api from "../lib/axios";
// import { formatRupiah } from "../lib/utils";
// import { Plus, Building2 } from "lucide-react";

// // Definisikan tipe data untuk Bank
// type Bank = {
//   id: string;
//   nama: string;
//   rek: string;
// };

// export default function TableMutasiBank() {
//   const [daftarBank, setDaftarBank] = useState<Bank[]>([]);
//   const [bankTerpilih, setBankTerpilih] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(true);

//   // Ambil data bank dari API Backend saat komponen di-render pertama kali
//   useEffect(() => {
//     const fetchBanks = async () => {
//       try {
//         const response = await api.get('/banks');
//         const banksData = response.data.data;
        
//         setDaftarBank(banksData);
        
//         // Otomatis pilih bank pertama jika data tersedia
//         if (banksData && banksData.length > 0) {
//           setBankTerpilih(banksData[0].id);
//         }
//       } catch (error) {
//         console.error("Gagal mengambil data bank:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBanks();
//   }, []);

//   // Dapatkan detail bank yang sedang dipilih, atau berikan nilai default saat loading
//   const detailBank = daftarBank.find((b) => b.id === bankTerpilih) || { id: "-", nama: "Memuat Data...", rek: "-" };

//   return (
//     <div className="space-y-6">
//       {/* --- Bagian Kontrol (Dropdown & Tombol Tambah) --- */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
//             <Building2 size={20} />
//           </div>
//           <label className="font-semibold text-slate-700 whitespace-nowrap">Pilih Buku Bank:</label>
//           <select
//             className="w-full sm:w-64 border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium disabled:opacity-50"
//             value={bankTerpilih}
//             onChange={(e) => setBankTerpilih(e.target.value)}
//             disabled={isLoading || daftarBank.length === 0}
//           >
//             {isLoading ? (
//               <option value="">Memuat bank...</option>
//             ) : daftarBank.length === 0 ? (
//               <option value="">Tidak ada data bank</option>
//             ) : (
//               daftarBank.map((bank) => (
//                 <option key={bank.id} value={bank.id}>
//                   {bank.nama} - {bank.rek}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
//           <Plus size={18} /> Tambah Bank Baru
//         </button>
//       </div>

//       {/* --- Bagian Tabel Mutasi --- */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold font-sans uppercase text-slate-800">
//             {detailBank.nama} No. REK. {detailBank.rek}
//           </h2>
//           <p className="text-sm font-semibold mt-1 text-slate-600">Saldo Awal Januari 2026</p>
//         </div>

//         <table className="w-full text-sm border-collapse border border-slate-400 min-w-[900px]">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="border border-slate-400 p-2 text-center w-12">No.</th>
//               <th className="border border-slate-400 p-2 text-center w-28">Tanggal</th>
//               <th className="border border-slate-400 p-2 text-center">Uraian / Keterangan</th>
//               <th className="border border-slate-400 p-2 text-center w-24">No. AKUN</th>
//               <th className="border border-slate-400 p-2 text-center w-36">DEBET</th>
//               <th className="border border-slate-400 p-2 text-center w-36">KREDIT</th>
//               <th className="border border-slate-400 p-2 text-center w-36">SISA SALDO</th>
//               <th className="border-y border-slate-400 p-2 w-4 bg-white"></th>
//               <th className="border border-slate-400 p-2 text-center w-48">NAMA AKUN</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Baris Transaksi Dummy (Nanti diganti dinamis dari database) */}
//             <tr className="hover:bg-slate-50 transition-colors">
//               <td className="border border-slate-400 p-2 text-center">1</td>
//               <td className="border border-slate-400 p-2 text-center">04-Jan-2026</td>
//               <td className="border border-slate-400 p-2">Penjualan Beras - INV 002/BRS/BMP/I/2026</td>
//               <td className="border border-slate-400 p-2 text-center font-semibold">{detailBank.id !== "-" ? detailBank.id : ""}</td>
//               <td className="border border-slate-400 p-2 text-right font-medium">{formatRupiah(1500000)}</td>
//               <td className="border border-slate-400 p-2 text-right"></td>
//               <td className="border border-slate-400 p-2 text-right font-bold text-blue-600">{formatRupiah(1500000)}</td>
//               <td className="border-y border-slate-400 p-2 bg-white"></td>
//               <td className="border border-slate-400 p-2 text-slate-600 font-medium">
//                 {detailBank.nama !== "Memuat Data..." ? `${detailBank.nama} ${detailBank.rek}` : ""}
//               </td>
//             </tr>

//             <tr className="hover:bg-slate-50 transition-colors">
//               <td className="border border-slate-400 p-2 text-center">2</td>
//               <td className="border border-slate-400 p-2 text-center">04-Jan-2026</td>
//               <td className="border border-slate-400 p-2">Penjualan Beras - INV 002/BRS/BMP/I/2026</td>
//               <td className="border border-slate-400 p-2 text-center font-semibold">509</td>
//               <td className="border border-slate-400 p-2 text-right"></td>
//               <td className="border border-slate-400 p-2 text-right font-medium">{formatRupiah(1500000)}</td>
//               <td className="border border-slate-400 p-2 text-right font-medium"></td>
//               <td className="border-y border-slate-400 p-2 bg-white"></td>
//               <td className="border border-slate-400 p-2 text-slate-600">Pendapatan Penjualan</td>
//             </tr>

//             {/* Baris Input Kosong */}
//             <tr>
//               <td className="border border-slate-400 p-2 text-center text-slate-400">3</td>
//               <td className="border border-slate-400 p-0">
//                 <input type="date" className="w-full p-2 outline-none focus:bg-blue-50 text-sm" />
//               </td>
//               <td className="border border-slate-400 p-0">
//                 <input type="text" placeholder="Ketik uraian..." className="w-full p-2 outline-none focus:bg-blue-50 text-sm" />
//               </td>
//               <td className="border border-slate-400 p-0">
//                 <input type="text" placeholder="Akun..." className="w-full p-2 outline-none focus:bg-blue-50 text-center font-semibold text-sm" />
//               </td>
//               <td className="border border-slate-400 p-0">
//                 <input type="number" placeholder="0" className="w-full p-2 outline-none focus:bg-blue-50 text-right text-sm" />
//               </td>
//               <td className="border border-slate-400 p-0">
//                 <input type="number" placeholder="0" className="w-full p-2 outline-none focus:bg-blue-50 text-right text-sm" />
//               </td>
//               <td className="border border-slate-400 p-2 bg-slate-50"></td>
//               <td className="border-y border-slate-400 p-2 bg-white"></td>
//               <td className="border border-slate-400 p-2 bg-slate-50 text-slate-400 italic text-sm">Otomatis Terisi</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // src/components/TabelMutasiBank.tsx
// import { useState, useEffect } from "react";
// import api from "../lib/axios";
// import { formatRupiah } from "../lib/utils";
// import { Plus, Building2 } from "lucide-react";

// // Definisikan tipe data sesuai struktur JSON dari Go
// type Bank = { id: string; nama: string; rek: string; };
// type Account = { code: string; name: string; };
// type JournalEntry = {
//   id: number;
//   journal_id: number;
//   account_code: string;
//   debit: number;
//   credit: number;
//   account: Account;
// };
// type Journal = {
//   id: number;
//   date: string;
//   reference_no: string;
//   description: string;
//   entries: JournalEntry[];
// };

// export default function TableMutasiBank() {
//   const [daftarBank, setDaftarBank] = useState<Bank[]>([]);
//   const [bankTerpilih, setBankTerpilih] = useState<string>("");
//   const [isLoadingBank, setIsLoadingBank] = useState(true);

//   // State untuk data jurnal/mutasi
//   const [mutasi, setMutasi] = useState<Journal[]>([]);
//   const [isLoadingMutasi, setIsLoadingMutasi] = useState(false);

//   // 1. Ambil data Bank saat komponen dimuat
//   useEffect(() => {
//     const fetchBanks = async () => {
//       try {
//         const response = await api.get('/banks');
//         const banksData = response.data.data;
//         setDaftarBank(banksData);
//         if (banksData && banksData.length > 0) {
//           setBankTerpilih(banksData[0].id);
//         }
//       } catch (error) {
//         console.error("Gagal mengambil data bank:", error);
//       } finally {
//         setIsLoadingBank(false);
//       }
//     };
//     fetchBanks();
//   }, []);

//   // 2. Ambil data Mutasi setiap kali Bank yang dipilih berubah
//   useEffect(() => {
//     if (!bankTerpilih) return;
//     const fetchMutasi = async () => {
//       setIsLoadingMutasi(true);
//       try {
//         const response = await api.get('/journals/mutations', {
//           params: { account_code: bankTerpilih }
//         });
//         setMutasi(response.data.data || []);
//       } catch (error) {
//         console.error("Gagal mengambil data mutasi:", error);
//       } finally {
//         setIsLoadingMutasi(false);
//       }
//     };
//     fetchMutasi();
//   }, [bankTerpilih]);

//   const detailBank = daftarBank.find((b) => b.id === bankTerpilih) || { id: "-", nama: "Memuat Data...", rek: "-" };

//   // Helper untuk format tanggal (Contoh: 04-Jan-2026)
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
//   };

//   // Variabel untuk menghitung running balance (Sisa Saldo)
//   let runningBalance = 0;
//   let rowNumber = 1;

//   // Karena dari backend diurutkan DESC, kita balik (ASC) agar saldo berakumulasi dari transaksi tertua ke terbaru
//   const sortedMutasi = [...mutasi].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.id - b.id);

//   return (
//     <div className="space-y-6">
//       {/* --- Bagian Kontrol (Dropdown & Tombol Tambah) --- */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
//             <Building2 size={20} />
//           </div>
//           <label className="font-semibold text-slate-700 whitespace-nowrap">Pilih Buku Bank:</label>
//           <select
//             className="w-full sm:w-64 border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium disabled:opacity-50"
//             value={bankTerpilih}
//             onChange={(e) => setBankTerpilih(e.target.value)}
//             disabled={isLoadingBank || daftarBank.length === 0}
//           >
//             {isLoadingBank ? (
//               <option value="">Memuat bank...</option>
//             ) : daftarBank.length === 0 ? (
//               <option value="">Tidak ada data bank</option>
//             ) : (
//               daftarBank.map((bank) => (
//                 <option key={bank.id} value={bank.id}>
//                   {bank.nama} - {bank.rek}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
//           <Plus size={18} /> Tambah Bank Baru
//         </button>
//       </div>

//       {/* --- Bagian Tabel Mutasi --- */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold font-sans uppercase text-slate-800">
//             {detailBank.nama} No. REK. {detailBank.rek}
//           </h2>
//           <p className="text-sm font-semibold mt-1 text-slate-600">Saldo Mutasi Bank</p>
//         </div>

//         <table className="w-full text-sm border-collapse border border-slate-400 min-w-[900px]">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="border border-slate-400 p-2 text-center w-12">No.</th>
//               <th className="border border-slate-400 p-2 text-center w-28">Tanggal</th>
//               <th className="border border-slate-400 p-2 text-center">Uraian / Keterangan</th>
//               <th className="border border-slate-400 p-2 text-center w-24">No. AKUN</th>
//               <th className="border border-slate-400 p-2 text-center w-36">DEBET</th>
//               <th className="border border-slate-400 p-2 text-center w-36">KREDIT</th>
//               <th className="border border-slate-400 p-2 text-center w-36">SISA SALDO</th>
//               <th className="border-y border-slate-400 p-2 w-4 bg-white"></th>
//               <th className="border border-slate-400 p-2 text-center w-48">NAMA AKUN</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoadingMutasi ? (
//               <tr>
//                 <td colSpan={9} className="border border-slate-400 p-4 text-center text-slate-500 font-medium">
//                   Memuat riwayat transaksi...
//                 </td>
//               </tr>
//             ) : sortedMutasi.length === 0 ? (
//               <tr>
//                 <td colSpan={9} className="border border-slate-400 p-4 text-center text-slate-500 font-medium">
//                   Belum ada transaksi di bank ini.
//                 </td>
//               </tr>
//             ) : (
//               sortedMutasi.map((journal) => 
//                 journal.entries.map((entry) => {
//                   const isBankRow = entry.account_code === bankTerpilih;
//                   // Kalkulasi running balance HANYA untuk baris bank itu sendiri (Debit menambah, Kredit mengurangi)
//                   if (isBankRow) {
//                     runningBalance += (entry.debit - entry.credit);
//                   }
                  
//                   const currentNo = rowNumber++;

//                   return (
//                     <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
//                       <td className="border border-slate-400 p-2 text-center">{currentNo}</td>
//                       <td className="border border-slate-400 p-2 text-center">{formatDate(journal.date)}</td>
//                       <td className="border border-slate-400 p-2">{journal.description} {journal.reference_no ? `- ${journal.reference_no}` : ''}</td>
//                       <td className="border border-slate-400 p-2 text-center font-semibold">{entry.account_code}</td>
//                       <td className="border border-slate-400 p-2 text-right font-medium">
//                         {entry.debit > 0 ? formatRupiah(entry.debit) : ""}
//                       </td>
//                       <td className="border border-slate-400 p-2 text-right font-medium">
//                         {entry.credit > 0 ? formatRupiah(entry.credit) : ""}
//                       </td>
//                       <td className={`border border-slate-400 p-2 text-right ${isBankRow ? 'font-bold text-blue-600' : ''}`}>
//                         {isBankRow ? formatRupiah(runningBalance) : ""}
//                       </td>
//                       <td className="border-y border-slate-400 p-2 bg-white"></td>
//                       <td className="border border-slate-400 p-2 text-slate-600 font-medium">
//                         {entry.account?.name || '-'}
//                       </td>
//                     </tr>
//                   );
//                 })
//               )
//             )}

//             {/* Baris Input Kosong untuk Entri Baru (Manual) */}
//             {!isLoadingMutasi && (
//               <tr>
//                 <td className="border border-slate-400 p-2 text-center text-slate-400">{rowNumber}</td>
//                 <td className="border border-slate-400 p-0">
//                   <input type="date" className="w-full p-2 outline-none focus:bg-blue-50 text-sm" />
//                 </td>
//                 <td className="border border-slate-400 p-0">
//                   <input type="text" placeholder="Ketik uraian..." className="w-full p-2 outline-none focus:bg-blue-50 text-sm" />
//                 </td>
//                 <td className="border border-slate-400 p-0">
//                   <input type="text" placeholder="Akun..." className="w-full p-2 outline-none focus:bg-blue-50 text-center font-semibold text-sm" />
//                 </td>
//                 <td className="border border-slate-400 p-0">
//                   <input type="number" placeholder="0" className="w-full p-2 outline-none focus:bg-blue-50 text-right text-sm" />
//                 </td>
//                 <td className="border border-slate-400 p-0">
//                   <input type="number" placeholder="0" className="w-full p-2 outline-none focus:bg-blue-50 text-right text-sm" />
//                 </td>
//                 <td className="border border-slate-400 p-2 bg-slate-50"></td>
//                 <td className="border-y border-slate-400 p-2 bg-white"></td>
//                 <td className="border border-slate-400 p-2 bg-slate-50 text-slate-400 italic text-sm">Otomatis Terisi</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// src/components/TabelMutasiBank.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { Plus, Building2, Save, Loader2 } from "lucide-react";

type Bank = { id: string; nama: string; rek: string; };
type Account = { code: string; name: string; };
type JournalEntry = { id: number; journal_id: number; account_code: string; debit: number; credit: number; account: Account; };
type Journal = { id: number; date: string; reference_no: string; description: string; entries: JournalEntry[]; };

export default function TableMutasiBank() {
  const [daftarBank, setDaftarBank] = useState<Bank[]>([]);
  const [bankTerpilih, setBankTerpilih] = useState<string>("");
  const [isLoadingBank, setIsLoadingBank] = useState(true);

  const [mutasi, setMutasi] = useState<Journal[]>([]);
  const [isLoadingMutasi, setIsLoadingMutasi] = useState(false);

  // --- State untuk Form Baris Baru ---
  const [formDate, setFormDate] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formAccount, setFormAccount] = useState("");
  const [formDebit, setFormDebit] = useState("");
  const [formCredit, setFormCredit] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await api.get('/banks');
        const banksData = response.data.data;
        setDaftarBank(banksData);
        if (banksData && banksData.length > 0) setBankTerpilih(banksData[0].id);
      } catch (error) {
        console.error("Gagal mengambil data bank:", error);
      } finally {
        setIsLoadingBank(false);
      }
    };
    fetchBanks();
  }, []);

  // Bungkus dalam useCallback agar bisa dipanggil ulang setelah save
  const fetchMutasi = useCallback(async () => {
    if (!bankTerpilih) return;
    setIsLoadingMutasi(true);
    try {
      const response = await api.get('/journals/mutations', { params: { account_code: bankTerpilih } });
      setMutasi(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data mutasi:", error);
    } finally {
      setIsLoadingMutasi(false);
    }
  }, [bankTerpilih]);

  useEffect(() => {
    fetchMutasi();
  }, [fetchMutasi]);

  // --- Fungsi Simpan Data (POST ke Backend) ---
  const handleSave = async () => {
    if (!formDate || !formDesc || !formAccount || (!formDebit && !formCredit)) {
      alert("Harap lengkapi Tanggal, Uraian, No. Akun, dan nominal (Debit/Kredit).");
      return;
    }

    const debitVal = parseFloat(formDebit) || 0;
    const creditVal = parseFloat(formCredit) || 0;

    if (debitVal > 0 && creditVal > 0) {
      alert("Isi salah satu saja antara Debit atau Kredit.");
      return;
    }

    setIsSaving(true);
    try {
      // Logic Double-Entry: 
      // Jika Debit diisi -> Bank masuk (Debet), Akun lawan dikredit.
      // Jika Kredit diisi -> Bank keluar (Kredit), Akun lawan didebet.
      const entries = [
        {
          account_code: bankTerpilih,
          debit: debitVal > 0 ? debitVal : 0,
          credit: creditVal > 0 ? creditVal : 0,
        },
        {
          account_code: formAccount,
          debit: creditVal > 0 ? creditVal : 0,
          credit: debitVal > 0 ? debitVal : 0,
        }
      ];

      await api.post('/journals', {
        date: formDate,
        description: formDesc,
        reference_no: "", // Bisa di-generate atau ditambah input khusus nantinya
        entries: entries
      });

      // Reset form
      setFormDate(""); setFormDesc(""); setFormAccount(""); setFormDebit(""); setFormCredit("");
      
      // Refresh tabel
      fetchMutasi();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menyimpan jurnal");
    } finally {
      setIsSaving(false);
    }
  };

  const detailBank = daftarBank.find((b) => b.id === bankTerpilih) || { id: "-", nama: "Memuat Data...", rek: "-" };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  };

  let runningBalance = 0;
  let rowNumber = 1;
  const sortedMutasi = [...mutasi].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.id - b.id);

  return (
    <div className="space-y-6">
      {/* Header Dropdown (Tetap sama) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Building2 size={20} /></div>
          <label className="font-semibold text-slate-700 whitespace-nowrap">Pilih Buku Bank:</label>
          <select
            className="w-full sm:w-64 border border-slate-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium disabled:opacity-50"
            value={bankTerpilih}
            onChange={(e) => setBankTerpilih(e.target.value)}
            disabled={isLoadingBank || daftarBank.length === 0}
          >
            {isLoadingBank ? <option value="">Memuat bank...</option> : daftarBank.map((bank) => (
              // <option key={bank.id} value={bank.id}>{bank.nama} - {bank.rek}</option>
              <option key={bank.id} value={bank.id}>{bank.nama}</option>
            ))}
          </select>
        </div>
        {/* <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} /> Tambah Bank Baru
        </button> */}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold font-sans uppercase text-slate-800">{detailBank.nama} No. REK. {detailBank.rek}</h2>
          <p className="text-sm font-semibold mt-1 text-slate-600">Saldo Mutasi Bank</p>
        </div>

        <table className="w-full text-sm border-collapse border border-slate-400 min-w-[900px]">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-400 p-2 text-center w-12">No.</th>
              <th className="border border-slate-400 p-2 text-center w-28">Tanggal</th>
              <th className="border border-slate-400 p-2 text-center">Uraian / Keterangan</th>
              <th className="border border-slate-400 p-2 text-center w-24">No. AKUN</th>
              <th className="border border-slate-400 p-2 text-center w-32">DEBET</th>
              <th className="border border-slate-400 p-2 text-center w-32">KREDIT</th>
              <th className="border border-slate-400 p-2 text-center w-36">SISA SALDO</th>
              <th className="border-y border-slate-400 p-2 w-4 bg-white"></th>
              <th className="border border-slate-400 p-2 text-center w-40">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingMutasi ? (
              <tr><td colSpan={9} className="border border-slate-400 p-4 text-center text-slate-500 font-medium">Memuat riwayat transaksi...</td></tr>
            ) : (
              sortedMutasi.map((journal) => 
                journal.entries.map((entry) => {
                  const isBankRow = entry.account_code === bankTerpilih;
                  if (isBankRow) runningBalance += (entry.debit - entry.credit);
                  
                  return (
                    <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="border border-slate-400 p-2 text-center">{rowNumber++}</td>
                      <td className="border border-slate-400 p-2 text-center">{formatDate(journal.date)}</td>
                      <td className="border border-slate-400 p-2">{journal.description} {journal.reference_no ? `- ${journal.reference_no}` : ''}</td>
                      <td className="border border-slate-400 p-2 text-center font-semibold">{entry.account_code}</td>
                      <td className="border border-slate-400 p-2 text-right font-medium">{entry.debit > 0 ? formatRupiah(entry.debit) : ""}</td>
                      <td className="border border-slate-400 p-2 text-right font-medium">{entry.credit > 0 ? formatRupiah(entry.credit) : ""}</td>
                      <td className={`border border-slate-400 p-2 text-right ${isBankRow ? 'font-bold text-blue-600' : ''}`}>
                        {isBankRow ? formatRupiah(runningBalance) : ""}
                      </td>
                      <td className="border-y border-slate-400 p-2 bg-white"></td>
                      <td className="border border-slate-400 p-2 text-slate-600 font-medium text-center">
                        {entry.account?.name || '-'}
                      </td>
                    </tr>
                  );
                })
              )
            )}

            {/* --- FORM BARIS BARU --- */}
            {!isLoadingMutasi && (
              <tr className="bg-blue-50/30">
                <td className="border border-slate-400 p-2 text-center text-slate-400 font-bold">{rowNumber}</td>
                <td className="border border-slate-400 p-0">
                  <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="w-full p-2 outline-none bg-transparent focus:bg-white text-sm" disabled={isSaving} />
                </td>
                <td className="border border-slate-400 p-0">
                  <input type="text" placeholder="Ketik uraian mutasi..." value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="w-full p-2 outline-none bg-transparent focus:bg-white text-sm" disabled={isSaving} />
                </td>
                <td className="border border-slate-400 p-0">
                  <input type="text" placeholder="Misal: 509" value={formAccount} onChange={(e) => setFormAccount(e.target.value)} className="w-full p-2 outline-none bg-transparent focus:bg-white text-center font-semibold text-sm" disabled={isSaving} />
                </td>
                <td className="border border-slate-400 p-0">
                  <input type="number" placeholder="0" value={formDebit} onChange={(e) => { setFormDebit(e.target.value); setFormCredit(""); }} className="w-full p-2 outline-none bg-transparent focus:bg-white text-right text-sm" disabled={isSaving} />
                </td>
                <td className="border border-slate-400 p-0">
                  <input type="number" placeholder="0" value={formCredit} onChange={(e) => { setFormCredit(e.target.value); setFormDebit(""); }} className="w-full p-2 outline-none bg-transparent focus:bg-white text-right text-sm" disabled={isSaving} />
                </td>
                <td className="border border-slate-400 p-2 bg-slate-100"></td>
                <td className="border-y border-slate-400 p-2 bg-white"></td>
                <td className="border border-slate-400 p-1 text-center">
                  <button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="flex items-center justify-center gap-1 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-2 py-1.5 rounded transition-colors text-xs font-semibold"
                  >
                    {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Simpan
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}