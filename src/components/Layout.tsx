// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function Layout() {
//   return (
//     <div className="flex bg-slate-50 text-slate-900 min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8 overflow-y-auto">
//         {/* Tempat render komponen halaman secara dinamis */}
//         <Outlet /> 
//       </main>
//     </div>
//   );
// }

// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      {/* Kontainer Utama */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Outlet akan merender komponen halaman seperti Dashboard atau CoA */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}