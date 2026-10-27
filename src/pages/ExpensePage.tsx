// src/pages/Expenses.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { Receipt, Search, Plus, X, Loader2, Trash2 } from "lucide-react";

type Account = { code: string; name: string; type: string; };
type Expense = { 
  id: number; date: string; reference_no: string; amount: number; description: string;
  contact?: { name: string; }; account: Account; payment_account: Account;
};

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseAccounts, setExpenseAccounts] = useState<Account[]>([]);
  const [cashAccounts, setCashAccounts] = useState<Account[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    reference_no: "",
    account_code: "",
    payment_code: "",
    amount: "",
    description: ""
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [expRes, accRes] = await Promise.all([
        api.get('/expenses'),
        api.get('/accounts')
      ]);
      setExpenses(expRes.data.data || []);
      
      const allAccs = accRes.data.data || [];
      setExpenseAccounts(allAccs.filter((a: Account) => a.code.startsWith('6'))); // Akun Beban/Biaya
      setCashAccounts(allAccs.filter((a: Account) => a.code.startsWith('111')));  // Akun Kas/Bank
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.post('/expenses', {
        ...formData,
        amount: Number(formData.amount)
      });
      setIsModalOpen(false);
      setFormData({ date: new Date().toISOString().split('T')[0], reference_no: "", account_code: "", payment_code: "", amount: "", description: "" });
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menyimpan pengeluaran");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Yakin ingin menghapus catatan biaya ini? (Jurnal akuntansi tidak akan terhapus otomatis)")) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchData();
    } catch (error) {
      alert("Gagal menghapus biaya");
    }
  };

  const filteredExpenses = expenses.filter(e => 
    e.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.reference_no && e.reference_no.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Receipt className="text-orange-600" size={28} /> Pengeluaran Biaya
          </h1>
          <p className="text-slate-500 mt-1">Catat biaya operasional dan otomatis bayar dari Kas/Bank</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Catat Biaya
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari deskripsi atau akun..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-white border-b border-slate-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Tanggal</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Akun Biaya</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Bayar Dari</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Deskripsi</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-right">Nominal (Rp)</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500">Memuat...</td></tr>
            ) : filteredExpenses.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500">Belum ada catatan biaya.</td></tr>
            ) : (
              filteredExpenses.map((exp) => (
                <tr key={exp.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="p-4 text-sm">{new Date(exp.date).toLocaleDateString('id-ID')}</td>
                  <td className="p-4 text-sm font-bold text-slate-700">[{exp.account.code}] {exp.account.name}</td>
                  <td className="p-4 text-sm text-slate-600">{exp.payment_account.name}</td>
                  <td className="p-4 text-sm text-slate-800">{exp.description} <br/><span className="text-xs text-slate-400">{exp.reference_no}</span></td>
                  <td className="p-4 text-sm font-bold text-red-600 text-right">{formatRupiah(exp.amount)}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleDelete(exp.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Catat Pengeluaran Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input type="date" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor Referensi (Opsional)</label>
                  <input type="text" placeholder="Cth: INV-PLN-12" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.reference_no} onChange={(e) => setFormData({...formData, reference_no: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div>
                  <label className="block text-sm font-bold text-orange-900 mb-1">Akun Biaya (Debit)</label>
                  <select required className="w-full border border-orange-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.account_code} onChange={(e) => setFormData({...formData, account_code: e.target.value})}>
                    <option value="" disabled>-- Pilih Beban --</option>
                    {expenseAccounts.map(a => <option key={a.code} value={a.code}>[{a.code}] {a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Bayar Dari Akun (Kredit)</label>
                  <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.payment_code} onChange={(e) => setFormData({...formData, payment_code: e.target.value})}>
                    <option value="" disabled>-- Pilih Kas/Bank --</option>
                    {cashAccounts.map(a => <option key={a.code} value={a.code}>[{a.code}] {a.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Total Nominal Pengeluaran</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500">Rp</span>
                  <input type="number" required min="1" className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 rounded-lg font-bold text-lg outline-none focus:border-orange-500"
                    value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi / Keterangan Singkat</label>
                <textarea required rows={2} placeholder="Cth: Pembayaran token listrik bulan Agustus" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-bold">Batal</button>
                <button type="submit" disabled={isSaving} className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Simpan & Buat Jurnal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}