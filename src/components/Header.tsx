// src/components/Header.tsx
import { 
  Plus, Receipt, Monitor, Search, 
  Bell, Clock, Globe, User, ToggleLeft, PanelLeftClose
} from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-10">
      {/* Kiri: Quick Actions */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 py-1.5 rounded border border-transparent hover:border-slate-200 transition-colors text-sm font-medium">
          <Plus size={16} className="text-blue-600" /> Jual
        </button>
        <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 py-1.5 rounded border border-transparent hover:border-slate-200 transition-colors text-sm font-medium">
          <Plus size={16} className="text-blue-600" /> Beli
        </button>
        <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 py-1.5 rounded border border-transparent hover:border-slate-200 transition-colors text-sm font-medium">
          <Receipt size={16} className="text-blue-600" /> Biaya
        </button>
        <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 py-1.5 rounded border border-transparent hover:border-slate-200 transition-colors text-sm font-medium">
          <Monitor size={16} className="text-blue-600" /> Kasir
        </button>
        <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 py-1.5 rounded border border-transparent hover:border-slate-200 transition-colors text-sm font-medium">
          <Search size={16} className="text-blue-600" /> Cari
        </button>
      </div>

      {/* Kanan: Profil & Notifikasi */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-slate-700 hidden md:block">
          PT BERLIANMANDIRI PERKASA
        </span>
        
        <div className="flex items-center gap-3 text-slate-400 border-l border-slate-200 pl-4">
          <button className="hover:text-blue-600 flex items-center gap-1 border border-slate-200 rounded px-1.5 py-0.5 text-xs font-semibold">
            ID
          </button>
          <button className="hover:text-blue-600 relative">
            <Clock size={18} />
          </button>
          <button className="hover:text-blue-600 relative">
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="hover:text-blue-600">
            <ToggleLeft size={20} className="text-slate-300" />
          </button>
          <button className="bg-slate-100 p-1.5 rounded-full text-slate-500 hover:bg-slate-200">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}