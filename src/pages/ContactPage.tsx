// src/pages/Contacts.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { 
  Plus, Search, Filter, Edit, Trash2, Users, X, Loader2 
} from "lucide-react";

type Contact = {
  id: number;
  name: string;
  type: string;
  phone: string;
  email: string;
  address: string;
};

const initialFormState = {
  name: "",
  type: "Customer", // Default value
  phone: "",
  email: "",
  address: ""
};

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState(initialFormState);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/contacts');
      setContacts(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data kontak:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleOpenModal = (mode: "create" | "edit", contact?: Contact) => {
    setModalMode(mode);
    if (mode === "edit" && contact) {
      setEditId(contact.id);
      setFormData({
        name: contact.name,
        type: contact.type,
        phone: contact.phone,
        email: contact.email,
        address: contact.address
      });
    } else {
      setEditId(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (modalMode === "create") {
        await api.post('/contacts', formData);
      } else {
        await api.put(`/contacts/${editId}`, formData);
      }
      setIsModalOpen(false);
      fetchContacts();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menyimpan kontak");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Yakin ingin menghapus kontak "${name}"?`)) {
      try {
        await api.delete(`/contacts/${id}`);
        fetchContacts();
      } catch (error) {
        alert("Gagal menghapus kontak");
      }
    }
  };

  // Filter gabungan: Pencarian teks & Dropdown Tipe
  const filteredContacts = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "All" || c.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 pb-10 relative">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Users className="text-blue-600" size={28} /> Buku Kontak
          </h1>
          <p className="text-slate-500 mt-1">Kelola data Pelanggan (Customer) dan Pemasok (Supplier)</p>
        </div>
        <button 
          onClick={() => handleOpenModal("create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Tambah Kontak
        </button>
      </div>

      {/* --- TABEL --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* TOOLBAR */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari nama atau no telp..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select 
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
              value={filterType} onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">Semua Tipe</option>
              <option value="Customer">Customer</option>
              <option value="Supplier">Supplier</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600 w-12 text-center">No</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Nama Kontak</th>
                <th className="p-4 text-sm font-semibold text-slate-600 w-32">Tipe</th>
                <th className="p-4 text-sm font-semibold text-slate-600">No. Telepon</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Email</th>
                <th className="p-4 text-sm font-semibold text-slate-600 w-64">Alamat</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={7} className="p-8 text-center text-slate-500">Memuat data kontak...</td></tr>
              ) : filteredContacts.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-slate-500">Kontak tidak ditemukan.</td></tr>
              ) : (
                filteredContacts.map((contact, index) => (
                  <tr key={contact.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-center font-medium text-slate-500">{index + 1}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{contact.name}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.type === 'Customer' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {contact.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600 font-medium">{contact.phone || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{contact.email || '-'}</td>
                    <td className="p-4 text-sm text-slate-600 truncate max-w-xs" title={contact.address}>{contact.address || '-'}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleOpenModal("edit", contact)} className="text-blue-500 hover:bg-blue-100 p-1.5 rounded transition-colors" title="Edit"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(contact.id, contact.name)} className="text-red-500 hover:bg-red-100 p-1.5 rounded transition-colors" title="Hapus"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL FORM KONTAK --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800">{modalMode === "create" ? "Tambah Kontak Baru" : "Edit Kontak"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Kontak</label>
                    <input type="text" required placeholder="Nama Perusahaan / Perorangan" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tipe Kontak</label>
                    <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                      value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      <option value="Customer">Customer (Pelanggan)</option>
                      <option value="Supplier">Supplier (Pemasok)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">No. Telepon / WA</label>
                    <input type="text" placeholder="08..." className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                    <input type="email" placeholder="email@contoh.com" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat Lengkap</label>
                    <textarea rows={3} placeholder="Alamat jalan, kota, provinsi..." className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                      value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">Batal</button>
                <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center min-w-[100px] transition-colors">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Simpan Kontak"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}