// // src/pages/auth/LoginPage.tsx
// import { useState } from 'react';
// import { useAuth } from '../../../contexts/AuthContext';
// import { Loader2, Lock, User } from 'lucide-react';
// import axios from 'axios';

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const { login } = useAuth();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMsg('');

//     try {
//       // Pastikan URL mengarah ke auth/login
//       const response = await axios.post('http://localhost:8080/api/auth/login', {
//         username,
//         password
//       });

//       // Panggil fungsi login dari AuthContext
//       login(response.data.token, response.data.user);
//     } catch (error: any) {
//       setErrorMsg(error.response?.data?.error || 'Gagal terhubung ke server');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
//       <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
//         <div className="bg-slate-900 p-8 text-center">
//           <h1 className="text-2xl font-bold text-orange-400">PT Berlian Mandiri Perkasa</h1>
//           <p className="text-slate-400 mt-2 text-sm">Sistem ERP Internal Management</p>
//         </div>
        
//         <div className="p-8">
//           <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Masuk ke Akun Anda</h2>
          
//           {errorMsg && (
//             <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5 text-center font-medium border border-red-200">
//               {errorMsg}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
//                   <User size={18} />
//                 </div>
//                 <input 
//                   type="text" required
//                   className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//                   placeholder="Ketik username Anda"
//                   value={username} onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
//                   <Lock size={18} />
//                 </div>
//                 <input 
//                   type="password" required
//                   className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//                   placeholder="Ketik password Anda"
//                   value={password} onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center text-slate-600 cursor-pointer">
//                 <input type="checkbox" className="mr-2 rounded text-blue-600 focus:ring-blue-500" />
//                 Ingat saya
//               </label>
//               <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Lupa Password?</a>
//             </div>

//             <button 
//               type="submit" disabled={isLoading}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 shadow-md"
//             >
//               {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Login ke Sistem"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/auth/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext'; // Pastikan path import disesuaikan
import { Link } from 'react-router-dom'; // <--- IMPORT LINK
import { Loader2, Lock, User } from 'lucide-react';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });

      login(response.data.token, response.data.user);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || 'Gagal terhubung ke server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <h1 className="text-2xl font-bold text-orange-400">PT Berlian Mandiri Perkasa</h1>
          <p className="text-slate-400 mt-2 text-sm">Sistem ERP Internal Management</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Masuk ke Akun Anda</h2>
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5 text-center font-medium border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="Ketik username Anda"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="Ketik password Anda"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-slate-600 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded text-blue-600 focus:ring-blue-500" />
                Ingat saya
              </label>
              <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Lupa Password?</a>
            </div>

            <button 
              type="submit" disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 shadow-md"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Login ke Sistem"}
            </button>
          </form>

          {/* === TAMBAHAN LINK KE HALAMAN REGISTER === */}
          <div className="mt-8 text-center text-sm text-slate-600">
            Belum punya akun staf?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline hover:text-blue-700 transition-colors">
              Daftar di sini
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}