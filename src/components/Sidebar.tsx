// src/components/Sidebar.tsx
import { Link } from "react-router-dom"; // Pastikan menggunakan react-router-dom
import { LayoutDashboard, BookOpen, FileText, PieChart } from "lucide-react";

export default function Sidebar() {
  return (
    <>
    {/* Perubahan ada di baris bawah ini: min-h-screen diganti menjadi h-screen sticky top-0 */}
    <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 p-4 flex flex-col">
      <div className="mb-8 p-2 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-orange-400">PT Berlianmandiri Perkasa</h1>
        <p className="text-xs text-slate-400 mt-1">v0.1.0 MVP Demo</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        <Link to="/" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/accounts" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors">
          <BookOpen size={20} /> Chart of Accounts
        </Link>
        <Link to="/journals" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors">
          <FileText size={20} /> Jurnal Umum
        </Link>
        <Link to="#" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
          <PieChart size={20} /> Laporan
        </Link>
      </nav>
    </aside>
    </>
  );
}