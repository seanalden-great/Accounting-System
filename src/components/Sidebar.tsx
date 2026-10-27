// // src/components/Sidebar.tsx
// import { Link } from "react-router-dom"; // Pastikan menggunakan react-router-dom
// import { LayoutDashboard, BookOpen, FileText, PieChart } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <>
//     {/* Perubahan ada di baris bawah ini: min-h-screen diganti menjadi h-screen sticky top-0 */}
//     <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 p-4 flex flex-col">
//       <div className="mb-8 p-2 border-b border-slate-700">
//         <h1 className="text-2xl font-bold text-orange-400">PT Berlianmandiri Perkasa</h1>
//         <p className="text-xs text-slate-400 mt-1">v0.1.0 MVP Demo</p>
//       </div>
      
//       <nav className="flex-1 space-y-2">
//         <Link to="/" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors">
//           <LayoutDashboard size={20} /> Dashboard
//         </Link>
//         <Link to="/accounts" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors">
//           <BookOpen size={20} /> Chart of Accounts
//         </Link>
//         <Link to="/journals" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors">
//           <FileText size={20} /> Jurnal Umum
//         </Link>
//         <Link to="#" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
//           <PieChart size={20} /> Laporan
//         </Link>
//       </nav>
//     </aside>
//     </>
//   );
// }

// // src/components/Sidebar.tsx
// import { Link, useLocation } from "react-router-dom";
// import { 
//   Home, ShoppingBag, ShoppingCart, Receipt, Package, Warehouse, 
//   LineChart, Wallet, Book, Building2, Users, Store, Settings, 
//   HelpCircle, Search, ChevronDown, LogOut, PanelLeftClose, Star
// } from "lucide-react";

// export default function Sidebar() {
//   const location = useLocation();

//   // Daftar menu sesuai struktur Kledo
//   const menuItems = [
//     { name: "Beranda", icon: Home, path: "/" },
//     { name: "Penjualan", icon: ShoppingBag, path: "/penjualan", hasSub: true },
//     { name: "Pembelian", icon: ShoppingCart, path: "/pembelian", hasSub: true },
//     { name: "Biaya", icon: Receipt, path: "/biaya" },
//     { name: "Produk", icon: Package, path: "/produk" },
//     { name: "Inventori", icon: Warehouse, path: "/inventori" },
//     { name: "Laporan", icon: LineChart, path: "/laporan" },
//     { name: "Kas & Bank", icon: Wallet, path: "/journals" },
//     { name: "Akun", icon: Book, path: "/accounts" },
//     { name: "Aset Tetap", icon: Building2, path: "/aset" },
//     { name: "Kontak", icon: Users, path: "/kontak" },
//     { name: "Marketplace", icon: Store, path: "/marketplace", badge: true },
//     { name: "Pengaturan", icon: Settings, path: "/pengaturan" },
//     { name: "FAQ", icon: HelpCircle, path: "/faq" },
//   ];

//   return (
//     <aside className="w-[260px] bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col font-sans">
//       {/* Header Logo */}
//       <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 shrink-0">
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
//             K
//           </div>
//           <div>
//             <h1 className="text-sm font-bold text-slate-800 leading-tight">PT Berlianmandi...</h1>
//             <p className="text-[10px] text-slate-400">Elite</p>
//           </div>
//         </div>
//         <button className="text-slate-400 hover:text-slate-600">
//           <PanelLeftClose size={18} />
//         </button>
//       </div>

//       {/* Search Menu */}
//       <div className="p-4 shrink-0">
//         <div className="relative">
//           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//           <input 
//             type="text" 
//             placeholder="Cari menu" 
//             className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-600 transition-all"
//           />
//         </div>
//       </div>
      
//       {/* Menu List */}
//       <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 custom-scrollbar pb-4">
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link 
//               key={index} 
//               to={item.path} 
//               className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
//                 isActive 
//                   ? "bg-blue-50 text-blue-600 font-medium" 
//                   : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <item.icon size={18} className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} />
//                 <span className="text-sm">{item.name}</span>
//               </div>
              
//               {/* Indikator Dropdown atau Badge */}
//               {item.hasSub && (
//                 <ChevronDown size={14} className="text-slate-400" />
//               )}
//               {item.badge && (
//                 <Star size={12} className="text-yellow-400 fill-yellow-400" />
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User Profile Footer */}
//       <div className="border-t border-slate-200 p-4 shrink-0 flex items-center justify-between bg-white">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//             N
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-sm font-bold text-slate-800 truncate">Nita</p>
//             <p className="text-[10px] text-slate-500 truncate w-32">PT Berlianmandiri Perkasa</p>
//           </div>
//         </div>
//         <button className="text-red-400 hover:text-red-600 p-1">
//           <LogOut size={16} />
//         </button>
//       </div>
//     </aside>
//   );
// }

// // src/components/Sidebar.tsx
// import { Link, useLocation } from "react-router-dom";
// import { 
//   Home, Package, Wallet, Book, Search, Users, ChevronDown, LogOut, PanelLeftClose, ShoppingCart, Star,
//   type LucideIcon // 1. Impor LucideIcon untuk keperluan tipe data
//  // 1. Impor LucideIcon untuk keperluan tipe data
// } from "lucide-react";

// // 2. Definisikan tipe data eksplisit agar TypeScript mengenali properti opsional
// type MenuItem = {
//   name: string;
//   icon: LucideIcon;
//   path: string;
//   hasSub?: boolean; // Tanda '?' berarti opsional (boleh ada, boleh tidak)
//   badge?: boolean;  // Tanda '?' berarti opsional
// };

// export default function Sidebar() {
//   const location = useLocation();

//   // 3. Pasang tipe MenuItem[] ke variabel ini
//   const menuItems: MenuItem[] = [
//     { name: "Beranda", icon: Home, path: "/" },
//     // { name: "Penjualan", icon: ShoppingBag, path: "/penjualan", hasSub: true },
//     { name: "Pembelian", icon: ShoppingCart, path: "/pembelian", hasSub: true },
//     // { name: "Biaya", icon: Receipt, path: "/biaya" },
//     { name: "Produk", icon: Package, path: "/produk" },
//     // { name: "Inventori", icon: Warehouse, path: "/inventori" },
//     // { name: "Laporan", icon: LineChart, path: "/laporan" },
//     { name: "Kas & Bank", icon: Wallet, path: "/journals" },
//     { name: "Akun", icon: Book, path: "/accounts" },
//     // { name: "Aset Tetap", icon: Building2, path: "/aset" },
//     { name: "Kontak", icon: Users, path: "/contacts" },
//     // { name: "Marketplace", icon: Store, path: "/marketplace", badge: true },
//     // { name: "Pengaturan", icon: Settings, path: "/pengaturan" },
//     // { name: "FAQ", icon: HelpCircle, path: "/faq" },
//   ];

//   return (
//     <aside className="w-[260px] bg-slate-900 text-white border-r border-slate-800 h-screen sticky top-0 flex flex-col font-sans">
//       {/* Header Logo */}
//       <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
//         <div className="flex items-center gap-2">
//           <div>
//             <h1 className="text-sm font-bold text-orange-400 leading-tight">PT Berlianmandiri Perkasa</h1>
//           </div>
//         </div>
//         <button className="text-slate-400 hover:text-white transition-colors">
//           <PanelLeftClose size={18} />
//         </button>
//       </div>
      
//       {/* Menu List */}
//       <nav className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar pb-4">
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link 
//               key={index} 
//               to={item.path} 
//               className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
//                 isActive 
//                   ? "bg-slate-800 text-blue-400 font-medium" 
//                   : "text-slate-300 hover:bg-slate-800 hover:text-white"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <item.icon size={18} className={isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white transition-colors"} />
//                 <span className="text-sm">{item.name}</span>
//               </div>
              
//               {/* Indikator Dropdown atau Badge */}
//               {item.hasSub && (
//                 <ChevronDown size={14} className="text-slate-500 group-hover:text-slate-300" />
//               )}
//               {item.badge && (
//                 <Star size={12} className="text-yellow-400 fill-yellow-400" />
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User Profile Footer */}
//       <div className="border-t border-slate-800 p-4 shrink-0 flex items-center justify-between bg-slate-900">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//             U
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-sm font-bold text-white truncate">User</p>
//             <p className="text-[10px] text-slate-400 truncate w-32">PT Berlianmandiri Perkasa</p>
//           </div>
//         </div>
//         <button className="text-red-400 hover:text-red-500 p-1 transition-colors">
//           <LogOut size={16} />
//         </button>
//       </div>
//     </aside>
//   );
// }

// // src/components/Sidebar.tsx
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { 
//   Home, Package, Wallet, Book, Users, ChevronDown, ChevronRight, LogOut, PanelLeftClose, ShoppingCart, ShoppingBag, Star,
//   type LucideIcon 
// } from "lucide-react";

// // Definisikan tipe untuk sub-menu
// type SubMenuItem = {
//   name: string;
//   path: string;
// };

// // Perbarui tipe data MenuItem
// type MenuItem = {
//   name: string;
//   icon: LucideIcon;
//   path?: string; // Dibuat opsional karena menu induk dengan submenu mungkin tidak punya path langsung
//   hasSub?: boolean;
//   badge?: boolean;
//   subItems?: SubMenuItem[]; // Array untuk menampung sub-menu
// };

// export default function Sidebar() {
//   const location = useLocation();
  
//   // State untuk melacak menu dropdown mana yang sedang terbuka
//   const [openMenus, setOpenMenus] = useState<string[]>([]);

//   // Fungsi untuk toggle (buka/tutup) dropdown menu
//   const toggleMenu = (menuName: string) => {
//     setOpenMenus((prev) => 
//       prev.includes(menuName) 
//         ? prev.filter((name) => name !== menuName) // Tutup jika sudah terbuka
//         : [...prev, menuName] // Buka jika masih tertutup
//     );
//   };

//   const menuItems: MenuItem[] = [
//     { name: "Beranda", icon: Home, path: "/" },
//     { 
//       name: "Penjualan", 
//       icon: ShoppingBag, 
//       hasSub: true,
//       subItems: [
//         { name: "Pesanan Penjualan", path: "/sales/order" },
//         { name: "Pengiriman Penjualan", path: "/sales/delivery" },
//         { name: "Tagihan Penjualan", path: "/sales/bill" },
//       ]
//     },
//     { 
//       name: "Pembelian", 
//       icon: ShoppingCart, 
//       hasSub: true,
//       subItems: [
//         { name: "Pesanan Pembelian", path: "/purchase/order" },
//         { name: "Pengiriman Pembelian", path: "/purchase/delivery" },
//         { name: "Tagihan Pembelian", path: "/purchase/bill" },
//       ]
//     },
//     { name: "Produk", icon: Package, path: "/produk" },
//     { name: "Kas & Bank", icon: Wallet, path: "/journals" },
//     { name: "Akun", icon: Book, path: "/accounts" },
//     { name: "Kontak", icon: Users, path: "/contacts" },
//   ];

//   // Helper untuk mengecek apakah path saat ini merupakan bagian dari menu induk
//   const isParentActive = (item: MenuItem) => {
//     if (item.path && location.pathname === item.path) return true;
//     if (item.subItems) {
//       return item.subItems.some(sub => location.pathname.startsWith(sub.path));
//     }
//     return false;
//   };

//   return (
//     <aside className="w-[260px] bg-slate-900 text-white border-r border-slate-800 h-screen sticky top-0 flex flex-col font-sans">
//       {/* Header Logo */}
//       <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
//         <div className="flex items-center gap-2">
//           <div>
//             <h1 className="text-sm font-bold text-orange-400 leading-tight">PT Berlianmandiri Perkasa</h1>
//           </div>
//         </div>
//         <button className="text-slate-400 hover:text-white transition-colors">
//           <PanelLeftClose size={18} />
//         </button>
//       </div>
      
//       {/* Menu List */}
//       <nav className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar pb-4 pt-4">
//         {menuItems.map((item, index) => {
//           const isActive = isParentActive(item);
//           const isOpen = openMenus.includes(item.name) || isActive; // Otomatis buka dropdown jika sub-menunya sedang aktif

//           return (
//             <div key={index}>
//               {/* Menu Induk (Bisa berupa Link atau Button Toggle) */}
//               {item.hasSub ? (
//                 <button 
//                   onClick={() => toggleMenu(item.name)}
//                   className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
//                     isActive ? "bg-slate-800 text-blue-400 font-medium" : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <item.icon size={18} className={isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white transition-colors"} />
//                     <span className="text-sm">{item.name}</span>
//                   </div>
//                   {isOpen ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-500" />}
//                 </button>
//               ) : (
//                 <Link 
//                   to={item.path || "#"} 
//                   className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
//                     isActive ? "bg-slate-800 text-blue-400 font-medium" : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <item.icon size={18} className={isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white transition-colors"} />
//                     <span className="text-sm">{item.name}</span>
//                   </div>
//                   {item.badge && <Star size={12} className="text-yellow-400 fill-yellow-400" />}
//                 </Link>
//               )}

//               {/* Sub Menu List (Render jika menu memiliki subItems dan statusnya Open) */}
//               {item.hasSub && isOpen && item.subItems && (
//                 <div className="mt-1 mb-2 ml-4 pl-4 border-l border-slate-700 space-y-1">
//                   {item.subItems.map((sub, subIndex) => {
//                     const isSubActive = location.pathname === sub.path;
//                     return (
//                       <Link 
//                         key={subIndex}
//                         to={sub.path}
//                         className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
//                           isSubActive 
//                             ? "bg-slate-800 text-blue-400 font-medium" 
//                             : "text-slate-400 hover:bg-slate-800 hover:text-white"
//                         }`}
//                       >
//                         {sub.name}
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* User Profile Footer */}
//       <div className="border-t border-slate-800 p-4 shrink-0 flex items-center justify-between bg-slate-900">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//             U
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-sm font-bold text-white truncate">User</p>
//             <p className="text-[10px] text-slate-400 truncate w-32">PT Berlianmandiri Perkasa</p>
//           </div>
//         </div>
//         <button className="text-red-400 hover:text-red-500 p-1 transition-colors">
//           <LogOut size={16} />
//         </button>
//       </div>
//     </aside>
//   );
// }

// src/components/Sidebar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Package, HelpCircle, Receipt, Briefcase, Settings, Archive, Wallet, Book, Users, ChevronDown, ChevronRight, LogOut, PanelLeftClose, ShoppingCart, ShoppingBag, Star, LineChart,
  type LucideIcon 
} from "lucide-react";

type SubMenuItem = { name: string; path: string; };

type MenuItem = {
  name: string;
  icon: LucideIcon;
  path?: string; 
  hasSub?: boolean;
  badge?: boolean;
  subItems?: SubMenuItem[]; 
};

export default function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => 
      prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName]
    );
  };

  // const menuItems: MenuItem[] = [
  //   { name: "Beranda", icon: Home, path: "/" },
  //   { 
  //     name: "Penjualan", icon: ShoppingBag, hasSub: true,
  //     subItems: [
  //       { name: "Pesanan Penjualan", path: "/sales/order" },
  //       { name: "Pengiriman Penjualan", path: "/sales/delivery" },
  //       { name: "Tagihan Penjualan", path: "/sales/bill" },
  //     ]
  //   },
  //   { 
  //     name: "Pembelian", icon: ShoppingCart, hasSub: true,
  //     subItems: [
  //       { name: "Pesanan Pembelian", path: "/purchase/order" },
  //       { name: "Pengiriman Pembelian", path: "/purchase/delivery" },
  //       { name: "Tagihan Pembelian", path: "/purchase/bill" },
  //     ]
  //   },
  //   { name: "Biaya", icon: Receipt, path: "/expenses" }, // <--- TAMBAHKAN MENU BIAYA DISINI
  //   { name: "Produk", icon: Package, path: "/produk" },
  //   { name: "Inventori", icon: Archive, path: "/inventory" }, // <--- TAMBAHKAN MENU INVENTORI
  //   { name: "Kas & Bank", icon: Wallet, path: "/journals" },
  //   { name: "Akun", icon: Book, path: "/accounts" },
  //   { name: "Kontak", icon: Users, path: "/contacts" },
  //   { 
  //     name: "Laporan", icon: LineChart, hasSub: true,
  //     subItems: [
  //       { name: "Laba Rugi", path: "/reports/profit-loss" },
  //       { name: "Neraca", path: "/reports/balance-sheet" },
  //     ]
  //   },
  // ];

  const menuItems: MenuItem[] = [
    { name: "Beranda", icon: Home, path: "/" },
    { 
      name: "Penjualan", icon: ShoppingBag, hasSub: true,
      subItems: [
        { name: "Pesanan Penjualan", path: "/sales/order" },
        { name: "Pengiriman Penjualan", path: "/sales/delivery" },
        { name: "Tagihan Penjualan", path: "/sales/bill" },
      ]
    },
    { 
      name: "Pembelian", icon: ShoppingCart, hasSub: true,
      subItems: [
        { name: "Pesanan Pembelian", path: "/purchase/order" },
        { name: "Pengiriman Pembelian", path: "/purchase/delivery" },
        { name: "Tagihan Pembelian", path: "/purchase/bill" },
      ]
    },
    { name: "Biaya", icon: Receipt, path: "/expenses" },
    { name: "Produk", icon: Package, path: "/produk" },
    { name: "Inventori", icon: Archive, path: "/inventory" },
    { name: "Aset Tetap", icon: Briefcase, path: "/fixed-assets" },
    { name: "Kas & Bank", icon: Wallet, path: "/journals" },
    { name: "Akun", icon: Book, path: "/accounts" },
    { name: "Kontak", icon: Users, path: "/contacts" },
    { 
      name: "Laporan", icon: LineChart, hasSub: true,
      subItems: [
        { name: "Laba Rugi", path: "/reports/profit-loss" },
        { name: "Neraca", path: "/reports/balance-sheet" },
      ]
    },
    { name: "Pengaturan", icon: Settings, path: "/settings" },
    { name: "FAQ", icon: HelpCircle, path: "/faq" },
  ];

  const isParentActive = (item: MenuItem) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.subItems) return item.subItems.some(sub => location.pathname.startsWith(sub.path));
    return false;
  };

  return (
    <aside className="w-[260px] bg-slate-900 text-white border-r border-slate-800 h-screen sticky top-0 flex flex-col font-sans">
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div><h1 className="text-sm font-bold text-orange-400 leading-tight">PT Berlianmandiri Perkasa</h1></div>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors"><PanelLeftClose size={18} /></button>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar pb-4 pt-4">
        {menuItems.map((item, index) => {
          const isActive = isParentActive(item);
          const isOpen = openMenus.includes(item.name) || isActive; 

          return (
            <div key={index}>
              {item.hasSub ? (
                <button 
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                    isActive ? "bg-slate-800 text-blue-400 font-medium" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white transition-colors"} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {isOpen ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-500" />}
                </button>
              ) : (
                <Link 
                  to={item.path || "#"} 
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                    isActive ? "bg-slate-800 text-blue-400 font-medium" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white transition-colors"} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.badge && <Star size={12} className="text-yellow-400 fill-yellow-400" />}
                </Link>
              )}

              {item.hasSub && isOpen && item.subItems && (
                <div className="mt-1 mb-2 ml-4 pl-4 border-l border-slate-700 space-y-1">
                  {item.subItems.map((sub, subIndex) => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link 
                        key={subIndex} to={sub.path}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isSubActive ? "bg-slate-800 text-blue-400 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4 shrink-0 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">U</div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">User</p>
            <p className="text-[10px] text-slate-400 truncate w-32">PT Berlianmandiri Perkasa</p>
          </div>
        </div>
        <button className="text-red-400 hover:text-red-500 p-1 transition-colors"><LogOut size={16} /></button>
      </div>
    </aside>
  );
}