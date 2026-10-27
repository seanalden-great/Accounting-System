// // src/pages/Products.tsx
// import { useState } from "react";
// import { formatRupiah } from "../lib/utils";
// import { 
//   Plus, Search, Filter, MoreHorizontal, 
//   Edit, Trash2, Package, ArrowUpDown 
// } from "lucide-react";

// export default function ProductsPage() {
//   // Data dummy produk & jasa
//   const [products] = useState([
//     { id: 1, sku: "BRG-001", name: "Beras Premium 5Kg", category: "Barang Jadi", buyPrice: 55000, sellPrice: 65000, stock: 150 },
//     { id: 2, sku: "BRG-002", name: "Minyak Goreng Bimoli 2L", category: "Barang Jadi", buyPrice: 32000, sellPrice: 38000, stock: 85 },
//     { id: 3, sku: "BRG-003", name: "Gula Pasir 1Kg", category: "Barang Jadi", buyPrice: 14000, sellPrice: 17000, stock: 210 },
//     { id: 4, sku: "SRV-001", name: "Jasa Pengiriman (Kurir Internal)", category: "Jasa", buyPrice: 0, sellPrice: 15000, stock: null },
//     { id: 5, sku: "BHK-001", name: "Kardus Packing Polos", category: "Bahan Habis Pakai", buyPrice: 2000, sellPrice: 0, stock: 500 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter produk berdasarkan pencarian nama atau SKU
//   const filteredProducts = products.filter(p => 
//     p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     p.sku.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6 pb-10">
//       {/* Header Halaman */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
//             <Package className="text-blue-600" size={28} /> Daftar Produk
//           </h1>
//           <p className="text-slate-500 mt-1">Kelola data barang, jasa, dan inventori Anda</p>
//         </div>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
//           <Plus size={18} /> Tambah Produk
//         </button>
//       </div>

//       {/* Area Tabel */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
//         {/* Toolbar (Pencarian & Filter) */}
//         <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
//           <div className="relative w-full sm:w-80">
//             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input 
//               type="text" 
//               placeholder="Cari nama atau SKU produk..." 
//               className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
//               <Filter size={16} /> Filter
//             </button>
//           </div>
//         </div>

//         {/* Tabel Data */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-white border-b border-slate-200">
//               <tr>
//                 <th className="p-4 text-sm font-semibold text-slate-600 w-24">
//                   <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
//                     SKU <ArrowUpDown size={14} />
//                   </div>
//                 </th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Nama Produk</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Kategori</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Beli</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Jual</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center">Stok</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center w-16">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((product) => (
//                 <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
//                   <td className="p-4 text-sm font-mono font-medium text-blue-600">
//                     {product.sku}
//                   </td>
//                   <td className="p-4 text-sm font-medium text-slate-800">
//                     {product.name}
//                   </td>
//                   <td className="p-4 text-sm">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       product.category === 'Jasa' ? 'bg-purple-100 text-purple-700' :
//                       product.category === 'Barang Jadi' ? 'bg-green-100 text-green-700' :
//                       'bg-orange-100 text-orange-700'
//                     }`}>
//                       {product.category}
//                     </span>
//                   </td>
//                   <td className="p-4 text-sm text-slate-600 text-right">
//                     {product.buyPrice > 0 ? formatRupiah(product.buyPrice) : "-"}
//                   </td>
//                   <td className="p-4 text-sm font-semibold text-slate-800 text-right">
//                     {product.sellPrice > 0 ? formatRupiah(product.sellPrice) : "-"}
//                   </td>
//                   <td className="p-4 text-sm text-center">
//                     {product.stock !== null ? (
//                       <span className={`font-semibold ${product.stock < 100 ? 'text-orange-500' : 'text-slate-700'}`}>
//                         {product.stock}
//                       </span>
//                     ) : (
//                       <span className="text-slate-400 italic">N/A</span>
//                     )}
//                   </td>
//                   <td className="p-4 text-center">
//                     <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50">
//                       <MoreHorizontal size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {filteredProducts.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="p-8 text-center text-slate-500">
//                     Produk tidak ditemukan.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Footer Tabel (Pagination Dummy) */}
//         <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-sm text-slate-500">
//           <div>Menampilkan {filteredProducts.length} dari {products.length} produk</div>
//           <div className="flex gap-1">
//             <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Sebelumnnya</button>
//             <button className="px-3 py-1 border border-slate-300 rounded bg-blue-50 text-blue-600 font-medium">1</button>
//             <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Selanjutnya</button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// // src/pages/Products.tsx
// import { useState, useEffect, useCallback } from "react";
// import api from "../lib/axios";
// import { formatRupiah } from "../lib/utils";
// import { 
//   Plus, Search, Filter, Edit, Trash2, Package, ArrowUpDown, X, Loader2 
// } from "lucide-react";

// type Product = {
//   id: number;
//   sku: string;
//   name: string;
//   category: string;
//   unit: string;
//   buyPrice: number;
//   sellPrice: number;
//   hpp: number;
//   stock: number;
// };

// const initialFormState = {
//   sku: "", name: "", category: "Barang Jadi", unit: "Pcs", 
//   buyPrice: 0, sellPrice: 0, hpp: 0, stock: 0
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [modalMode, setModalMode] = useState<"create" | "edit">("create");
//   const [editId, setEditId] = useState<number | null>(null);
//   const [formData, setFormData] = useState(initialFormState);

//   const fetchProducts = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await api.get('/products');
//       setProducts(response.data.data || []);
//     } catch (error) {
//       console.error("Gagal mengambil data produk:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleOpenModal = (mode: "create" | "edit", product?: Product) => {
//     setModalMode(mode);
//     if (mode === "edit" && product) {
//       setEditId(product.id);
//       setFormData({
//         sku: product.sku, name: product.name, category: product.category, unit: product.unit,
//         buyPrice: product.buyPrice, sellPrice: product.sellPrice, hpp: product.hpp, stock: product.stock
//       });
//     } else {
//       setEditId(null);
//       setFormData(initialFormState);
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSaving(true);
//     try {
//       // Konversi string input (jika ada) kembali ke number untuk keamanan
//       const payload = {
//         ...formData,
//         buyPrice: Number(formData.buyPrice),
//         sellPrice: Number(formData.sellPrice),
//         hpp: Number(formData.hpp),
//         stock: Number(formData.stock)
//       };

//       if (modalMode === "create") {
//         await api.post('/products', payload);
//       } else {
//         await api.put(`/products/${editId}`, payload);
//       }
//       setIsModalOpen(false);
//       fetchProducts();
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Terjadi kesalahan saat menyimpan produk");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDelete = async (id: number, name: string) => {
//     if (window.confirm(`Yakin ingin menghapus produk "${name}"?`)) {
//       try {
//         await api.delete(`/products/${id}`);
//         fetchProducts();
//       } catch (error) {
//         alert("Gagal menghapus produk");
//       }
//     }
//   };

//   const filteredProducts = products.filter(p => 
//     p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     p.sku.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6 pb-10 relative">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
//             <Package className="text-blue-600" size={28} /> Daftar Produk
//           </h1>
//           <p className="text-slate-500 mt-1">Kelola data barang, jasa, dan inventori Anda</p>
//         </div>
//         <button 
//           onClick={() => handleOpenModal("create")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
//         >
//           <Plus size={18} /> Tambah Produk
//         </button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
//           <div className="relative w-full sm:w-80">
//             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input 
//               type="text" placeholder="Cari nama atau SKU produk..." 
//               className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
//             <Filter size={16} /> Filter
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[1000px]">
//             <thead className="bg-white border-b border-slate-200">
//               <tr>
//                 <th className="p-4 text-sm font-semibold text-slate-600 w-24">
//                   <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">SKU <ArrowUpDown size={14} /></div>
//                 </th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Nama Produk</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Kategori</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center">Satuan</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Beli</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">HPP</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Jual</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center">Stok</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center w-24">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr><td colSpan={9} className="p-8 text-center text-slate-500">Memuat data produk...</td></tr>
//               ) : filteredProducts.length === 0 ? (
//                 <tr><td colSpan={9} className="p-8 text-center text-slate-500">Produk tidak ditemukan.</td></tr>
//               ) : (
//                 filteredProducts.map((product) => (
//                   <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
//                     <td className="p-4 text-sm font-mono font-medium text-blue-600">{product.sku}</td>
//                     <td className="p-4 text-sm font-medium text-slate-800">{product.name}</td>
//                     <td className="p-4 text-sm">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         product.category === 'Jasa' ? 'bg-purple-100 text-purple-700' :
//                         product.category === 'Barang Jadi' ? 'bg-green-100 text-green-700' :
//                         'bg-orange-100 text-orange-700'
//                       }`}>
//                         {product.category}
//                       </span>
//                     </td>
//                     <td className="p-4 text-sm text-center text-slate-600">{product.unit || '-'}</td>
//                     <td className="p-4 text-sm text-slate-600 text-right">{product.buyPrice > 0 ? formatRupiah(product.buyPrice) : "-"}</td>
//                     <td className="p-4 text-sm font-medium text-orange-600 text-right">{product.hpp > 0 ? formatRupiah(product.hpp) : "-"}</td>
//                     <td className="p-4 text-sm font-semibold text-slate-800 text-right">{product.sellPrice > 0 ? formatRupiah(product.sellPrice) : "-"}</td>
//                     <td className="p-4 text-sm text-center">
//                       <span className={`font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-slate-700'}`}>
//                         {product.stock}
//                       </span>
//                     </td>
//                     <td className="p-4 text-center">
//                       <div className="flex items-center justify-center gap-2">
//                         <button onClick={() => handleOpenModal("edit", product)} className="text-blue-500 hover:bg-blue-100 p-1.5 rounded transition-colors" title="Edit">
//                           <Edit size={16} />
//                         </button>
//                         <button onClick={() => handleDelete(product.id, product.name)} className="text-red-500 hover:bg-red-100 p-1.5 rounded transition-colors" title="Hapus">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL FORM PRODUK --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
//             <div className="flex justify-between items-center p-5 border-b border-slate-200">
//               <h3 className="text-lg font-bold text-slate-800">{modalMode === "create" ? "Tambah Produk Baru" : "Edit Produk"}</h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={20} /></button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="p-5 overflow-y-auto custom-scrollbar">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Produk</label>
//                   <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">SKU</label>
//                   <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} disabled={modalMode === "edit"} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
//                   <select className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
//                     <option value="Barang Jadi">Barang Jadi</option>
//                     <option value="Bahan Baku">Bahan Baku</option>
//                     <option value="Bahan Habis Pakai">Bahan Habis Pakai</option>
//                     <option value="Jasa">Jasa</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Satuan</label>
//                   <input type="text" placeholder="Misal: Kg, Pcs, Liter" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Stok Awal</label>
//                   <input type="number" min="0" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Harga Beli</label>
//                   <input type="number" min="0" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.buyPrice} onChange={(e) => setFormData({...formData, buyPrice: Number(e.target.value)})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">HPP (Cost of Goods)</label>
//                   <input type="number" min="0" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.hpp} onChange={(e) => setFormData({...formData, hpp: Number(e.target.value)})} />
//                 </div>
//                 <div className="sm:col-span-2 border-t border-slate-200 mt-2 pt-4">
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Harga Jual</label>
//                   <input type="number" min="0" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm text-lg font-bold text-blue-700"
//                     value={formData.sellPrice} onChange={(e) => setFormData({...formData, sellPrice: Number(e.target.value)})} />
//                 </div>
//               </div>
//               <div className="mt-8 flex justify-end gap-3">
//                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">Batal</button>
//                 <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center min-w-[100px] transition-colors">
//                   {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Simpan Produk"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // src/pages/Products.tsx
// import { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom"; // Import Link
// import api from "../lib/axios";
// import { formatRupiah } from "../lib/utils";
// import { 
//   Plus, Search, Filter, Edit, Trash2, Package, ArrowUpDown, X, Loader2, Tags
// } from "lucide-react";

// type Product = { id: number; sku: string; name: string; category: string; unit: string; buyPrice: number; sellPrice: number; hpp: number; stock: number; };
// type Category = { id: number; name: string; }; // Tipe Kategori

// const initialFormState = { sku: "", name: "", category: "", unit: "Pcs", buyPrice: 0, sellPrice: 0, hpp: 0, stock: 0 };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]); // State Kategori
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [modalMode, setModalMode] = useState<"create" | "edit">("create");
//   const [editId, setEditId] = useState<number | null>(null);
//   const [formData, setFormData] = useState(initialFormState);

//   const fetchProductsAndCategories = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const [prodRes, catRes] = await Promise.all([
//         api.get('/products'),
//         api.get('/categories')
//       ]);
//       setProducts(prodRes.data.data || []);
//       setCategories(catRes.data.data || []);
//     } catch (error) {
//       console.error("Gagal mengambil data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProductsAndCategories();
//   }, [fetchProductsAndCategories]);

//   const handleOpenModal = (mode: "create" | "edit", product?: Product) => {
//     setModalMode(mode);
//     if (mode === "edit" && product) {
//       setEditId(product.id);
//       setFormData({
//         sku: product.sku, name: product.name, category: product.category, unit: product.unit,
//         buyPrice: product.buyPrice, sellPrice: product.sellPrice, hpp: product.hpp, stock: product.stock
//       });
//     } else {
//       setEditId(null);
//       setFormData(initialFormState);
//     }
//     setIsModalOpen(true);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.category) {
//       alert("Harap pilih kategori produk!");
//       return;
//     }
//     setIsSaving(true);
//     try {
//       const payload = { ...formData, buyPrice: Number(formData.buyPrice), sellPrice: Number(formData.sellPrice), hpp: Number(formData.hpp), stock: Number(formData.stock) };
//       if (modalMode === "create") {
//         await api.post('/products', payload);
//       } else {
//         await api.put(`/products/${editId}`, payload);
//       }
//       setIsModalOpen(false);
//       fetchProductsAndCategories();
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Gagal menyimpan produk");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDelete = async (id: number, name: string) => {
//     if (window.confirm(`Yakin ingin menghapus "${name}"?`)) {
//       try {
//         await api.delete(`/products/${id}`);
//         fetchProductsAndCategories();
//       } catch (error) {
//         alert("Gagal menghapus produk");
//       }
//     }
//   };

//   const filteredProducts = products.filter(p => 
//     p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     p.sku.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6 pb-10 relative">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
//             <Package className="text-blue-600" size={28} /> Daftar Produk
//           </h1>
//           <p className="text-slate-500 mt-1">Kelola data barang, jasa, dan inventori Anda</p>
//         </div>
//         <div className="flex items-center gap-3">
//           {/* Tombol Kelola Kategori */}
//           <Link to="/categories" className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
//             <Tags size={18} className="text-purple-600" /> Kelola Kategori
//           </Link>
//           <button onClick={() => handleOpenModal("create")} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
//             <Plus size={18} /> Tambah Produk
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
//           <div className="relative w-full sm:w-80">
//             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//             <input 
//               type="text" placeholder="Cari nama atau SKU produk..." 
//               className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[1000px]">
//             <thead className="bg-white border-b border-slate-200">
//               <tr>
//                 <th className="p-4 text-sm font-semibold text-slate-600 w-24">SKU</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Nama Produk</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600">Kategori</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center">Satuan</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Beli</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">HPP</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Jual</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center">Stok</th>
//                 <th className="p-4 text-sm font-semibold text-slate-600 text-center w-24">Aksi</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 <tr><td colSpan={9} className="p-8 text-center text-slate-500">Memuat data produk...</td></tr>
//               ) : filteredProducts.length === 0 ? (
//                 <tr><td colSpan={9} className="p-8 text-center text-slate-500">Produk tidak ditemukan.</td></tr>
//               ) : (
//                 filteredProducts.map((product) => (
//                   <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
//                     <td className="p-4 text-sm font-mono font-medium text-blue-600">{product.sku}</td>
//                     <td className="p-4 text-sm font-medium text-slate-800">{product.name}</td>
//                     <td className="p-4 text-sm"><span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{product.category}</span></td>
//                     <td className="p-4 text-sm text-center text-slate-600">{product.unit || '-'}</td>
//                     <td className="p-4 text-sm text-slate-600 text-right">{product.buyPrice > 0 ? formatRupiah(product.buyPrice) : "-"}</td>
//                     <td className="p-4 text-sm font-medium text-orange-600 text-right">{product.hpp > 0 ? formatRupiah(product.hpp) : "-"}</td>
//                     <td className="p-4 text-sm font-semibold text-slate-800 text-right">{product.sellPrice > 0 ? formatRupiah(product.sellPrice) : "-"}</td>
//                     <td className="p-4 text-sm text-center"><span className={`font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-slate-700'}`}>{product.stock}</span></td>
//                     <td className="p-4 text-center">
//                       <div className="flex items-center justify-center gap-2">
//                         <button onClick={() => handleOpenModal("edit", product)} className="text-blue-500 hover:bg-blue-100 p-1.5 rounded transition-colors"><Edit size={16} /></button>
//                         <button onClick={() => handleDelete(product.id, product.name)} className="text-red-500 hover:bg-red-100 p-1.5 rounded transition-colors"><Trash2 size={16} /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- MODAL FORM PRODUK --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
//             <div className="flex justify-between items-center p-5 border-b border-slate-200">
//               <h3 className="text-lg font-bold text-slate-800">{modalMode === "create" ? "Tambah Produk Baru" : "Edit Produk"}</h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={20} /></button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="p-5 overflow-y-auto custom-scrollbar">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Produk</label>
//                   <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">SKU</label>
//                   <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} disabled={modalMode === "edit"} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
//                   <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
//                     <option value="" disabled>Pilih Kategori...</option>
//                     {categories.map(cat => (
//                       <option key={cat.id} value={cat.name}>{cat.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Satuan</label>
//                   <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Stok Awal</label>
//                   <input type="number" min="0" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Harga Beli</label>
//                   <input type="number" min="0" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.buyPrice} onChange={(e) => setFormData({...formData, buyPrice: Number(e.target.value)})} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">HPP (Cost of Goods)</label>
//                   <input type="number" min="0" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                     value={formData.hpp} onChange={(e) => setFormData({...formData, hpp: Number(e.target.value)})} />
//                 </div>
//                 <div className="sm:col-span-2 border-t border-slate-200 mt-2 pt-4">
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Harga Jual</label>
//                   <input type="number" min="0" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm text-lg font-bold text-blue-700"
//                     value={formData.sellPrice} onChange={(e) => setFormData({...formData, sellPrice: Number(e.target.value)})} />
//                 </div>
//               </div>
//               <div className="mt-8 flex justify-end gap-3">
//                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">Batal</button>
//                 <button type="submit" disabled={isSaving || categories.length === 0} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center min-w-[100px] transition-colors">
//                   {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Simpan Produk"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/Products.tsx
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import { formatRupiah } from "../lib/utils";
import { 
  Plus, Search, Filter, Edit, Trash2, Package, ArrowUpDown, X, Loader2, Tags
} from "lucide-react";

type Product = { id: number; sku: string; name: string; category: string; unit: string; buyPrice: number; sellPrice: number; hpp: number; stock: number; };
type Category = { id: number; name: string; };

// HPP dihapus dari initial state
const initialFormState = { sku: "", name: "", category: "", unit: "Pcs", buyPrice: 0, sellPrice: 0, stock: 0 };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState(initialFormState);

  const fetchProductsAndCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodRes.data.data || []);
      setCategories(catRes.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsAndCategories();
  }, [fetchProductsAndCategories]);

  const handleOpenModal = (mode: "create" | "edit", product?: Product) => {
    setModalMode(mode);
    if (mode === "edit" && product) {
      setEditId(product.id);
      setFormData({
        sku: product.sku, name: product.name, category: product.category, unit: product.unit,
        buyPrice: product.buyPrice, sellPrice: product.sellPrice, stock: product.stock
      });
    } else {
      setEditId(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      alert("Harap pilih kategori produk!");
      return;
    }
    setIsSaving(true);
    try {
      // HPP tidak lagi dikirim dari form input manual
      const payload = { 
        ...formData, 
        buyPrice: Number(formData.buyPrice), 
        sellPrice: Number(formData.sellPrice), 
        stock: Number(formData.stock) 
      };
      
      if (modalMode === "create") {
        await api.post('/products', payload);
      } else {
        await api.put(`/products/${editId}`, payload);
      }
      setIsModalOpen(false);
      fetchProductsAndCategories();
    } catch (error: any) {
      alert(error.response?.data?.error || "Gagal menyimpan produk");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Yakin ingin menghapus "${name}"?`)) {
      try {
        await api.delete(`/products/${id}`);
        fetchProductsAndCategories();
      } catch (error) {
        alert("Gagal menghapus produk");
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Package className="text-blue-600" size={28} /> Daftar Produk
          </h1>
          <p className="text-slate-500 mt-1">Kelola data barang, jasa, dan inventori Anda</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/categories" className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
            <Tags size={18} className="text-purple-600" /> Kelola Kategori
          </Link>
          <button onClick={() => handleOpenModal("create")} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus size={18} /> Tambah Produk
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" placeholder="Cari nama atau SKU produk..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600 w-24">SKU</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Nama Produk</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Kategori</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Satuan</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Beli</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">HPP</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Jual</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Stok</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={9} className="p-8 text-center text-slate-500">Memuat data produk...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={9} className="p-8 text-center text-slate-500">Produk tidak ditemukan.</td></tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm font-mono font-medium text-blue-600">{product.sku}</td>
                    <td className="p-4 text-sm font-medium text-slate-800">{product.name}</td>
                    <td className="p-4 text-sm"><span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{product.category}</span></td>
                    <td className="p-4 text-sm text-center text-slate-600">{product.unit || '-'}</td>
                    <td className="p-4 text-sm text-slate-600 text-right">{product.buyPrice > 0 ? formatRupiah(product.buyPrice) : "-"}</td>
                    
                    {/* Tampilan HPP diubah menjadi indikator otomatis jika nilainya 0 */}
                    <td className="p-4 text-sm font-medium text-orange-600 text-right">
                      {product.hpp > 0 ? formatRupiah(product.hpp) : <span className="text-slate-400 italic text-xs">Otomatis</span>}
                    </td>
                    
                    <td className="p-4 text-sm font-semibold text-slate-800 text-right">{product.sellPrice > 0 ? formatRupiah(product.sellPrice) : "-"}</td>
                    <td className="p-4 text-sm text-center"><span className={`font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-slate-700'}`}>{product.stock}</span></td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleOpenModal("edit", product)} className="text-blue-500 hover:bg-blue-100 p-1.5 rounded transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(product.id, product.name)} className="text-red-500 hover:bg-red-100 p-1.5 rounded transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL FORM PRODUK --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-800">{modalMode === "create" ? "Tambah Produk Baru" : "Edit Produk"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Produk</label>
                  <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">SKU</label>
                  <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} disabled={modalMode === "edit"} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
                  <select required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="" disabled>Pilih Kategori...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Satuan</label>
                  <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Stok Awal</label>
                  <input type="number" min="0" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Harga Beli Dasar</label>
                  <input type="number" min="0" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={formData.buyPrice} onChange={(e) => setFormData({...formData, buyPrice: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Harga Jual</label>
                  <input type="number" min="0" required className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-blue-700"
                    value={formData.sellPrice} onChange={(e) => setFormData({...formData, sellPrice: Number(e.target.value)})} />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors">Batal</button>
                <button type="submit" disabled={isSaving || categories.length === 0} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center min-w-[100px] transition-colors">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Simpan Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}