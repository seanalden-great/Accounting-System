// src/pages/Categories.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { Plus, Edit, Trash2, Tags, X, Loader2 } from "lucide-react";

type Category = {
  id: number;
  name: string;
  description: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenModal = (mode: "create" | "edit", cat?: Category) => {
    setModalMode(mode);
    if (mode === "edit" && cat) {
      setEditId(cat.id);
      setFormData({ name: cat.name, description: cat.description });
    } else {
      setEditId(null);
      setFormData({ name: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (modalMode === "create") {
        await api.post('/categories', formData);
      } else {
        await api.put(`/categories/${editId}`, formData);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menyimpan kategori");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Yakin ingin menghapus kategori "${name}"?`)) {
      try {
        await api.delete(`/categories/${id}`);
        fetchCategories();
      } catch (error) {
        alert("Gagal menghapus kategori");
      }
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Tags className="text-purple-600" size={28} /> Kategori Produk
          </h1>
          <p className="text-slate-500 mt-1">Kelola pengelompokan barang dan jasa</p>
        </div>
        <button 
          onClick={() => handleOpenModal("create")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Tambah Kategori
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600 w-16 text-center">No</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Nama Kategori</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Keterangan</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">Belum ada kategori.</td></tr>
              ) : (
                categories.map((cat, index) => (
                  <tr key={cat.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-center font-medium text-slate-500">{index + 1}</td>
                    <td className="p-4 text-sm font-bold text-slate-800">{cat.name}</td>
                    <td className="p-4 text-sm text-slate-600">{cat.description || '-'}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleOpenModal("edit", cat)} className="text-blue-500 hover:bg-blue-100 p-1.5 rounded transition-colors" title="Edit"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(cat.id, cat.name)} className="text-red-500 hover:bg-red-100 p-1.5 rounded transition-colors" title="Hapus"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800">{modalMode === "create" ? "Tambah Kategori" : "Edit Kategori"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Kategori</label>
                  <input type="text" required placeholder="Misal: Barang Jadi" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Keterangan (Opsional)</label>
                  <textarea rows={3} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Batal</button>
                <button type="submit" disabled={isSaving} className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center min-w-[100px]">
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