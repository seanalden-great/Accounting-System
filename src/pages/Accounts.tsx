// import { formatRupiah } from "../lib/utils";

// export default function AccountsPage() {
//   const coaData = [
//     { code: "1", name: "AKTIVA", pos: "-", isHeader: true, level: 0 },
//     { code: "10", name: "AKTIVA LANCAR", pos: "-", isHeader: true, level: 1 },
//     { code: "100", name: "KAS", pos: "-", isHeader: true, level: 2 },
//     { code: "101", name: "Kas Kecil", pos: "D", debit: 5000000, kredit: 0, sisa: 5000000, level: 3 },
//     { code: "102", name: "Kas Utama", pos: "D", debit: 120000000, kredit: 0, sisa: 120000000, level: 3 },
//     { code: "103", name: "Kas Ko Rey", pos: "D", debit: 15000000, kredit: 0, sisa: 15000000, level: 3 },
//     { code: "110", name: "BANK", pos: "-", isHeader: true, level: 2 },
//     { code: "111", name: "BCA 5193336999", pos: "D", debit: 250000000, kredit: 0, sisa: 250000000, level: 3 },
//     { code: "112", name: "BRI 021102000141306", pos: "D", debit: 45000000, kredit: 0, sisa: 45000000, level: 3 },
//     { code: "113", name: "BRI 009601004488304", pos: "D", debit: 10000000, kredit: 0, sisa: 10000000, level: 3 },
//     { code: "114", name: "BRI BRITAMA 021101003124569", pos: "D", debit: 5000000, kredit: 0, sisa: 5000000, level: 3 },
//     { code: "120", name: "SURAT BERHARGA", pos: "-", isHeader: true, level: 2 },
//     { code: "121", name: "Deposito", pos: "D", debit: 500000000, kredit: 0, sisa: 500000000, level: 3 },
//     { code: "122", name: "Deposito Valas", pos: "D", debit: 0, kredit: 0, sisa: 0, level: 3 },
//     { code: "130", name: "PIUTANG USAHA", pos: "-", isHeader: true, level: 2 },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">Chart of Accounts</h1>
//           <p className="text-slate-500 mt-1">Kelola master data akun keuangan</p>
//         </div>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
//           + Tambah Akun Baru
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
//         <div className="mb-6 text-center sm:text-left">
//           <h2 className="text-xl font-bold font-sans">PT. BERLIAN MANDIRI PERKASA</h2>
//           <p className="text-lg font-semibold mt-1">Chart of Account</p>
//         </div>

//         <table className="w-full text-sm border-collapse border border-slate-400 min-w-[800px]">
//           <thead className="bg-slate-200">
//             <tr>
//               <th rowSpan={2} className="border border-slate-400 p-2 text-center w-24">CoA</th>
//               <th rowSpan={2} className="border border-slate-400 p-2 text-center">Nama Account</th>
//               <th rowSpan={2} className="border border-slate-400 p-2 text-center w-16">Pos</th>
//               <th colSpan={2} className="border border-slate-400 p-2 text-center">Saldo</th>
//               <th rowSpan={2} className="border border-slate-400 p-2 text-center w-40">SISA SALDO</th>
//             </tr>
//             <tr>
//               <th className="border border-slate-400 p-2 text-center w-36 bg-slate-100">D</th>
//               <th className="border border-slate-400 p-2 text-center w-36 bg-slate-100">K</th>
//             </tr>
//           </thead>
//           <tbody>
//             {coaData.map((acc, index) => (
//               <tr key={index} className="hover:bg-slate-50 transition-colors">
//                 <td className={`border border-slate-400 p-2 ${acc.isHeader ? 'font-bold' : ''}`}>
//                   {acc.code}
//                 </td>
//                 <td className={`border border-slate-400 p-2 ${acc.isHeader ? 'font-bold' : ''}`} 
//                     style={{ paddingLeft: `${(acc.level * 1.5) + 0.5}rem` }}>
//                   {acc.name}
//                 </td>
//                 <td className="border border-slate-400 p-2 text-center font-medium">
//                   {acc.pos}
//                 </td>
//                 <td className="border border-slate-400 p-2 text-right">
//                   {acc.debit !== undefined ? formatRupiah(acc.debit) : ""}
//                 </td>
//                 <td className="border border-slate-400 p-2 text-right">
//                   {acc.kredit !== undefined ? formatRupiah(acc.kredit) : ""}
//                 </td>
//                 <td className={`border border-slate-400 p-2 text-right ${acc.sisa && acc.sisa > 0 ? 'font-semibold text-blue-700' : ''}`}>
//                   {acc.sisa !== undefined ? formatRupiah(acc.sisa) : ""}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // src/pages/Accounts.tsx
// import { useState, useEffect, useCallback } from "react";
// import api from "../lib/axios";
// import { formatRupiah } from "../lib/utils";
// import { X, Loader2 } from "lucide-react";

// type Account = {
//   code: string;
//   name: string;
//   isHeader: boolean;
//   pos: string;
//   level: number;
//   debit?: number;
//   kredit?: number;
//   sisa?: number;
// };

// export default function AccountsPage() {
//   const [coaData, setCoaData] = useState<Account[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // State untuk Modal Tambah Akun
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     isHeader: false,
//     pos: "-",
//     level: 0,
//   });

//   const fetchAccounts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await api.get('/accounts');
//       setCoaData(response.data.data);
//     } catch (error) {
//       console.error("Gagal mengambil data CoA:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAccounts();
//   }, [fetchAccounts]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.code || !formData.name) {
//       alert("Kode dan Nama Akun wajib diisi!");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       await api.post('/accounts', formData);
//       setIsModalOpen(false);
//       setFormData({ code: "", name: "", isHeader: false, pos: "-", level: 0 }); // Reset form
//       fetchAccounts(); // Refresh tabel
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Terjadi kesalahan saat menyimpan akun");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* --- HEADER --- */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">Chart of Accounts</h1>
//           <p className="text-slate-500 mt-1">Kelola master data akun keuangan</p>
//         </div>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
//         >
//           + Tambah Akun Baru
//         </button>
//       </div>

//       {/* --- TABEL COA --- */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
//         <div className="mb-6 text-center sm:text-left">
//           <h2 className="text-xl font-bold font-sans">PT. BERLIAN MANDIRI PERKASA</h2>
//           <p className="text-lg font-semibold mt-1">Chart of Account</p>
//         </div>

//         <table className="w-full text-sm border-collapse border border-slate-400 min-w-[800px]">
//           <thead className="bg-slate-200">
//             <tr>
//               <th rowSpan={2} className="border border-slate-400 p-2 text-center w-24">CoA</th>
//               <th rowSpan={2} className="border border-slate-400 p-2 text-center">Nama Account</th>
//               <th rowSpan={2} className="border border-slate-400 p-2 text-center w-16">Pos</th>
//               <th colSpan={2} className="border border-slate-400 p-2 text-center">Saldo</th>
//               <th rowSpan={2} className="border border-slate-400 p-2 text-center w-40">SISA SALDO</th>
//             </tr>
//             <tr>
//               <th className="border border-slate-400 p-2 text-center w-36 bg-slate-100">D</th>
//               <th className="border border-slate-400 p-2 text-center w-36 bg-slate-100">K</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr><td colSpan={6} className="text-center p-4 text-slate-500">Memuat data dari database...</td></tr>
//             ) : coaData.length === 0 ? (
//               <tr><td colSpan={6} className="text-center p-4 text-slate-500">Belum ada data akun.</td></tr>
//             ) : (
//               coaData.map((acc, index) => (
//                 <tr key={index} className="hover:bg-slate-50 transition-colors">
//                   <td className={`border border-slate-400 p-2 ${acc.isHeader ? 'font-bold' : ''}`}>{acc.code}</td>
//                   <td className={`border border-slate-400 p-2 ${acc.isHeader ? 'font-bold' : ''}`} style={{ paddingLeft: `${(acc.level * 1.5) + 0.5}rem` }}>
//                     {acc.name}
//                   </td>
//                   <td className="border border-slate-400 p-2 text-center font-medium">{acc.pos}</td>
//                   <td className="border border-slate-400 p-2 text-right">{acc.debit ? formatRupiah(acc.debit) : ""}</td>
//                   <td className="border border-slate-400 p-2 text-right">{acc.kredit ? formatRupiah(acc.kredit) : ""}</td>
//                   <td className={`border border-slate-400 p-2 text-right ${acc.sisa && acc.sisa > 0 ? 'font-semibold text-blue-700' : ''}`}>
//                     {acc.sisa ? formatRupiah(acc.sisa) : ""}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* --- MODAL TAMBAH AKUN --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
//             <div className="flex justify-between items-center p-5 border-b border-slate-200">
//               <h3 className="text-lg font-bold text-slate-800">Tambah Akun Baru</h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors">
//                 <X size={20} />
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="p-5 overflow-y-auto custom-scrollbar">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Kode Akun</label>
//                   <input type="text" required placeholder="Misal: 115"
//                     className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Akun</label>
//                   <input type="text" required placeholder="Misal: Bank BNI"
//                     className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   />
//                 </div>

//                 <div className="flex items-center gap-2 mt-2">
//                   <input type="checkbox" id="isHeader" className="w-4 h-4 text-blue-600 rounded border-gray-300"
//                     checked={formData.isHeader} onChange={(e) => setFormData({...formData, isHeader: e.target.checked})}
//                   />
//                   <label htmlFor="isHeader" className="text-sm font-medium text-slate-700 cursor-pointer">
//                     Akun Induk (Header)
//                   </label>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-1">Pos Saldo</label>
//                     <select className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                       value={formData.pos} onChange={(e) => setFormData({...formData, pos: e.target.value})}
//                     >
//                       <option value="-">- (Netral)</option>
//                       <option value="D">D (Debit)</option>
//                       <option value="K">K (Kredit)</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-1">Level Indentasi</label>
//                     <input type="number" min="0" max="10"
//                       className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                       value={formData.level} onChange={(e) => setFormData({...formData, level: parseInt(e.target.value) || 0})}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 flex justify-end gap-3">
//                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">
//                   Batal
//                 </button>
//                 <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center min-w-[100px] transition-colors">
//                   {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Simpan"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/Accounts.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { X, Loader2, Edit, Trash2 } from "lucide-react";

type Account = {
  code: string;
  name: string;
  isHeader: boolean;
  pos: string;
  level: number;
  debit?: number;
  kredit?: number;
  sisa?: number;
};

export default function AccountsPage() {
  const [coaData, setCoaData] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk Modal Tambah/Edit Akun
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCode, setEditCode] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    isHeader: false,
    pos: "-",
    level: 0,
  });

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/accounts');
      setCoaData(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data CoA:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const openAddModal = () => {
    setIsEditing(false);
    setEditCode(null);
    setFormData({ code: "", name: "", isHeader: false, pos: "-", level: 0 });
    setIsModalOpen(true);
  };

  const openEditModal = (acc: Account) => {
    setIsEditing(true);
    setEditCode(acc.code);
    setFormData({
      code: acc.code,
      name: acc.name,
      isHeader: acc.isHeader,
      pos: acc.pos,
      level: acc.level,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (code: string) => {
    if (!confirm(`Yakin ingin menghapus akun ${code}?`)) return;
    try {
      await api.delete(`/accounts/${code}`);
      fetchAccounts();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menghapus akun");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name) {
      alert("Kode dan Nama Akun wajib diisi!");
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && editCode) {
        await api.put(`/accounts/${editCode}`, formData);
      } else {
        await api.post('/accounts', formData);
      }
      setIsModalOpen(false);
      fetchAccounts();
    } catch (error: any) {
      alert(error.response?.data?.error || "Terjadi kesalahan saat menyimpan akun");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Chart of Accounts</h1>
          <p className="text-slate-500 mt-1">Kelola master data akun keuangan</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          + Tambah Akun Baru
        </button>
      </div>

      {/* --- TABEL COA --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-300 overflow-x-auto">
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-xl font-bold font-sans">PT. BERLIAN MANDIRI PERKASA</h2>
          <p className="text-lg font-semibold mt-1">Chart of Account</p>
        </div>

        <table className="w-full text-sm border-collapse border border-slate-400 min-w-[900px]">
          <thead className="bg-slate-200">
            <tr>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center w-24">CoA</th>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center">Nama Account</th>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center w-16">Pos</th>
              <th colSpan={2} className="border border-slate-400 p-2 text-center">Saldo</th>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center w-40">SISA SALDO</th>
              <th rowSpan={2} className="border border-slate-400 p-2 text-center w-24">Aksi</th>
            </tr>
            <tr>
              <th className="border border-slate-400 p-2 text-center w-36 bg-slate-100">D</th>
              <th className="border border-slate-400 p-2 text-center w-36 bg-slate-100">K</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7} className="text-center p-4 text-slate-500">Memuat data dari database...</td></tr>
            ) : coaData.length === 0 ? (
              <tr><td colSpan={7} className="text-center p-4 text-slate-500">Belum ada data akun.</td></tr>
            ) : (
              coaData.map((acc, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className={`border border-slate-400 p-2 ${acc.isHeader ? 'font-bold' : ''}`}>{acc.code}</td>
                  <td className={`border border-slate-400 p-2 ${acc.isHeader ? 'font-bold' : ''}`} style={{ paddingLeft: `${(acc.level * 1.5) + 0.5}rem` }}>
                    {acc.name}
                  </td>
                  <td className="border border-slate-400 p-2 text-center font-medium">{acc.pos}</td>
                  <td className="border border-slate-400 p-2 text-right">{acc.debit ? formatRupiah(acc.debit) : ""}</td>
                  <td className="border border-slate-400 p-2 text-right">{acc.kredit ? formatRupiah(acc.kredit) : ""}</td>
                  <td className={`border border-slate-400 p-2 text-right ${acc.sisa && acc.sisa > 0 ? 'font-semibold text-blue-700' : ''}`}>
                    {acc.sisa ? formatRupiah(acc.sisa) : ""}
                  </td>
                  <td className="border border-slate-400 p-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEditModal(acc)} className="text-slate-400 hover:text-blue-600 transition-colors" title="Edit Akun">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(acc.code)} className="text-slate-400 hover:text-red-600 transition-colors" title="Hapus Akun">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL TAMBAH/EDIT AKUN --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800">
                {isEditing ? "Edit Akun" : "Tambah Akun Baru"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Kode Akun</label>
                  <input type="text" required placeholder="Misal: 115"
                    className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-slate-50 disabled:text-slate-500"
                    value={formData.code} 
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    disabled={isEditing} // Kode tidak boleh diubah saat mode Edit
                    title={isEditing ? "Kode akun tidak dapat diubah setelah dibuat" : ""}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Akun</label>
                  <input type="text" required placeholder="Misal: Bank BNI"
                    className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="isHeader" className="w-4 h-4 text-blue-600 rounded border-gray-300"
                    checked={formData.isHeader} onChange={(e) => setFormData({...formData, isHeader: e.target.checked})}
                  />
                  <label htmlFor="isHeader" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Akun Induk (Header)
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Pos Saldo</label>
                    <select className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={formData.pos} onChange={(e) => setFormData({...formData, pos: e.target.value})}
                    >
                      <option value="-">- (Netral)</option>
                      <option value="D">D (Debit)</option>
                      <option value="K">K (Kredit)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Level Indentasi</label>
                    <input type="number" min="0" max="10"
                      className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={formData.level} onChange={(e) => setFormData({...formData, level: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center min-w-[100px] transition-colors">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}