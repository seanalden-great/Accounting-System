// src/pages/FAQ.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { HelpCircle, Plus, X, Loader2, Search, ChevronDown, Trash2 } from "lucide-react";

type FAQ = { id: number; category: string; question: string; answer: string; };

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ category: "Umum", question: "", answer: "" });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/faqs');
      setFaqs(res.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.post('/faqs', formData);
      setIsModalOpen(false);
      setFormData({ category: "Umum", question: "", answer: "" });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menambahkan FAQ");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Hapus pertanyaan ini dari pusat bantuan?")) return;
    try {
      await api.delete(`/faqs/${id}`);
      fetchData();
    } catch (error) {
      alert("Gagal menghapus FAQ");
    }
  };

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <HelpCircle className="text-indigo-500" size={28} /> Pusat Bantuan (FAQ)
          </h1>
          <p className="text-slate-500 mt-1">Cari jawaban cepat untuk kendala sistem dan operasional</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Tambah FAQ
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Ketik kata kunci pertanyaan atau jawaban..." 
              className="w-full pl-9 pr-4 py-3 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="text-center text-slate-500 py-10">Memuat pusat bantuan...</div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center text-slate-500 py-10">Tidak ada FAQ yang cocok dengan pencarian Anda.</div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className={`border rounded-lg transition-colors overflow-hidden ${isOpen ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-200 bg-white'}`}>
                    <button 
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <div>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded mr-3">{faq.category}</span>
                        <span className="font-semibold text-slate-800">{faq.question}</span>
                      </div>
                      <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isOpen && (
                      <div className="p-4 pt-0 text-slate-600 text-sm border-t border-indigo-100 mt-2 relative">
                        <div className="pt-3 whitespace-pre-wrap pr-10">{faq.answer}</div>
                        <button 
                          onClick={() => handleDelete(faq.id)} 
                          className="absolute right-4 top-4 text-slate-400 hover:text-red-500 p-1"
                          title="Hapus FAQ"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Buat FAQ Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
                <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Umum">Umum</option>
                  <option value="Akuntansi">Akuntansi & Keuangan</option>
                  <option value="Inventori">Inventori Gudang</option>
                  <option value="Teknis Sistem">Teknis Sistem</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pertanyaan</label>
                <input type="text" required placeholder="Cth: Bagaimana cara mencatat barang retur?" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Jawaban Lengkap</label>
                <textarea required rows={5} placeholder="Tuliskan solusi atau langkah-langkah secara detail..." className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm leading-relaxed"
                  value={formData.answer} onChange={(e) => setFormData({...formData, answer: e.target.value})} />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-bold">Batal</button>
                <button type="submit" disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Publikasikan FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}