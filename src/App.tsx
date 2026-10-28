// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App

// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Journals from "./pages/Journals";
import Products from "./pages/Products"; // 1. Impor komponen Products
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import PurchaseOrderPage from "./pages/PurchaseOrderPage";
import PurchaseDeliveryPage from "./pages/PurchaseDeliveryPage";
import PurchaseBillPage from "./pages/PurchaseBillPage";
import SalesOrderPage from "./pages/SalesOrderPage";
import SalesDeliveryPage from "./pages/SalesDeliveryPage";
import SalesBillPage from "./pages/SalesBillPage";
import FinancialReportPage from "./pages/FinancialReportPage";
import ExpensePage from "./pages/ExpensePage";
import InventoryPage from "./pages/InventoryPage";
import SettingPage from "./pages/SettingPage";
import FixedAssetPage from "./pages/FixedAssetPage";
import FAQPage from "./pages/FAQPage";
import { AuthProvider } from "../contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/auth/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="journals" element={<Journals />} />
            <Route path="produk" element={<Products />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="purchase/order" element={<PurchaseOrderPage />} />
            <Route path="purchase/delivery" element={<PurchaseDeliveryPage />} />
            <Route path="purchase/bill" element={<PurchaseBillPage />} />
            <Route path="sales/order" element={<SalesOrderPage />} />
            <Route path="sales/delivery" element={<SalesDeliveryPage />} />
            <Route path="sales/bill" element={<SalesBillPage />} />
            <Route path="/reports/profit-loss" element={<FinancialReportPage />} />
            <Route path="/reports/balance-sheet" element={<FinancialReportPage />} />
            <Route path="/expenses" element={<ExpensePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/fixed-assets" element={<FixedAssetPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Route>
        </Routes> */}
        <Routes>
          {/* Rute Publik: Siapapun bisa akses */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* <--- 2. TAMBAHKAN RUTE INI */}

          {/* Rute Terproteksi: Hanya yang punya Token JWT yang bisa masuk */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="journals" element={<Journals />} />
              <Route path="produk" element={<Products />} />
              <Route path="categories" element={<CategoryPage />} />
              <Route path="contacts" element={<ContactPage />} />
              <Route path="purchase/order" element={<PurchaseOrderPage />} />
              <Route path="purchase/delivery" element={<PurchaseDeliveryPage />} />
              <Route path="purchase/bill" element={<PurchaseBillPage />} />
              <Route path="sales/order" element={<SalesOrderPage />} />
              <Route path="sales/delivery" element={<SalesDeliveryPage />} />
              <Route path="sales/bill" element={<SalesBillPage />} />
              <Route path="reports/profit-loss" element={<FinancialReportPage />} />
              <Route path="reports/balance-sheet" element={<FinancialReportPage />} />
              <Route path="expenses" element={<ExpensePage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="settings" element={<SettingPage />} />
              <Route path="fixed-assets" element={<FixedAssetPage />} />
              <Route path="faq" element={<FAQPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}