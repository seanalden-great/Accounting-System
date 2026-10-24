// src/pages/Products.tsx
import { useState } from "react";
import { formatRupiah } from "../lib/utils";
import { 
  Plus, Search, Filter, MoreHorizontal, 
  Edit, Trash2, Package, ArrowUpDown 
} from "lucide-react";

export default function ProductsPage() {
  // Data dummy produk & jasa
  const [products] = useState([
    { id: 1, sku: "BRG-001", name: "Beras Premium 5Kg", category: "Barang Jadi", buyPrice: 55000, sellPrice: 65000, stock: 150 },
    { id: 2, sku: "BRG-002", name: "Minyak Goreng Bimoli 2L", category: "Barang Jadi", buyPrice: 32000, sellPrice: 38000, stock: 85 },
    { id: 3, sku: "BRG-003", name: "Gula Pasir 1Kg", category: "Barang Jadi", buyPrice: 14000, sellPrice: 17000, stock: 210 },
    { id: 4, sku: "SRV-001", name: "Jasa Pengiriman (Kurir Internal)", category: "Jasa", buyPrice: 0, sellPrice: 15000, stock: null },
    { id: 5, sku: "BHK-001", name: "Kardus Packing Polos", category: "Bahan Habis Pakai", buyPrice: 2000, sellPrice: 0, stock: 500 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter produk berdasarkan pencarian nama atau SKU
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Package className="text-blue-600" size={28} /> Daftar Produk
          </h1>
          <p className="text-slate-500 mt-1">Kelola data barang, jasa, dan inventori Anda</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      {/* Area Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Toolbar (Pencarian & Filter) */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari nama atau SKU produk..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600 w-24">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                    SKU <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="p-4 text-sm font-semibold text-slate-600">Nama Produk</th>
                <th className="p-4 text-sm font-semibold text-slate-600">Kategori</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Beli</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Harga Jual</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center">Stok</th>
                <th className="p-4 text-sm font-semibold text-slate-600 text-center w-16">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-mono font-medium text-blue-600">
                    {product.sku}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-800">
                    {product.name}
                  </td>
                  <td className="p-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.category === 'Jasa' ? 'bg-purple-100 text-purple-700' :
                      product.category === 'Barang Jadi' ? 'bg-green-100 text-green-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600 text-right">
                    {product.buyPrice > 0 ? formatRupiah(product.buyPrice) : "-"}
                  </td>
                  <td className="p-4 text-sm font-semibold text-slate-800 text-right">
                    {product.sellPrice > 0 ? formatRupiah(product.sellPrice) : "-"}
                  </td>
                  <td className="p-4 text-sm text-center">
                    {product.stock !== null ? (
                      <span className={`font-semibold ${product.stock < 100 ? 'text-orange-500' : 'text-slate-700'}`}>
                        {product.stock}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Produk tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer Tabel (Pagination Dummy) */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-sm text-slate-500">
          <div>Menampilkan {filteredProducts.length} dari {products.length} produk</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Sebelumnnya</button>
            <button className="px-3 py-1 border border-slate-300 rounded bg-blue-50 text-blue-600 font-medium">1</button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Selanjutnya</button>
          </div>
        </div>

      </div>
    </div>
  );
}