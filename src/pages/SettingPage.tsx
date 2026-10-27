// src/pages/Settings.tsx
import { useState, useEffect } from "react";
import api from "../lib/axios";
import { Settings, Save, Loader2, Building2, MapPin, Phone, Mail, Percent } from "lucide-react";

export default function SettingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    tax_rate: 11.0
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/settings');
        if (res.data.data) {
          setFormData(res.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil pengaturan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put('/settings', {
        ...formData,
        tax_rate: Number(formData.tax_rate)
      });
      alert("Pengaturan perusahaan berhasil disimpan!");
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menyimpan pengaturan");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center text-slate-500">Memuat profil perusahaan...</div>;

  return (
    <div className="space-y-6 pb-10 max-w-4xl">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Settings className="text-slate-600" size={28} /> Pengaturan Sistem
          </h1>
          <p className="text-slate-500 mt-1">Kelola profil perusahaan dan konfigurasi dasar aplikasi ERP Anda</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="divide-y divide-slate-100">
          
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Building2 size={20} className="text-slate-400" /> Profil Perusahaan
            </h3>
            
            <div className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Perusahaan</label>
                <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1"><Phone size={14}/> Nomor Telepon</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1"><Mail size={14}/> Email Resmi</label>
                  <input type="email" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1"><MapPin size={14}/> Alamat Lengkap</label>
                <textarea rows={3} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Percent size={20} className="text-slate-400" /> Konfigurasi Keuangan
            </h3>
            <div className="max-w-xs">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Pajak Pertambahan Nilai (PPN) %</label>
              <div className="relative">
                <input type="number" step="0.1" required className="w-full pl-4 pr-10 py-2.5 border border-slate-300 rounded-lg font-bold outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.tax_rate} onChange={(e) => setFormData({...formData, tax_rate: Number(e.target.value)})} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Nilai ini akan dijadikan default saat mencetak tagihan ke pelanggan.</p>
            </div>
          </div>

          <div className="p-5 flex justify-end gap-3 bg-white">
            <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors">
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Simpan Pengaturan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}