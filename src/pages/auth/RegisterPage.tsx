// src/pages/auth/RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Lock, User, IdCard, Briefcase } from 'lucide-react';
import axios from 'axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    role: 'Staff',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await axios.post('http://localhost:8080/api/auth/register', formData);
      setSuccessMsg('Pendaftaran akun berhasil! Silakan login.');
      
      // Tunggu 2 detik lalu otomatis redirect ke halaman Login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || 'Gagal mendaftarkan akun. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans py-10">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <h1 className="text-2xl font-bold text-orange-400">PT Berlian Mandiri Perkasa</h1>
          <p className="text-slate-400 mt-2 text-sm">Pendaftaran Akun Baru</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Lengkapi Data Anda</h2>
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5 text-center font-medium border border-red-200">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-5 text-center font-medium border border-green-200">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Field Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <IdCard size={18} />
                </div>
                <input 
                  type="text" required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
            </div>

            {/* Field Username */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Username Login</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="Ketik username unik"
                  value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>

            {/* Field Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" required minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="Minimal 6 karakter"
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {/* Field Hak Akses / Role */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Jabatan / Hak Akses</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Briefcase size={18} />
                </div>
                <select 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none"
                  value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="Staff">Staff (Akses Standar)</option>
                  <option value="Manager">Manager (Persetujuan Data)</option>
                  <option value="Admin">Admin (Akses Penuh)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-4 shadow-md"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Daftarkan Akun"}
            </button>
          </form>

          {/* LINK KEMBALI KE LOGIN */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Sudah memiliki akun?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:underline hover:text-blue-700 transition-colors">
              Login di sini
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}