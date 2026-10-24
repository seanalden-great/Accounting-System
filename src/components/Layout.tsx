import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex bg-slate-50 text-slate-900 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Tempat render komponen halaman secara dinamis */}
        <Outlet /> 
      </main>
    </div>
  );
}