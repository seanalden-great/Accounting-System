// src/pages/Journals.tsx
import TableMutasiBank from "../components/TabelMutasiBank"; // Pastikan ejaan 'Tabel' sesuai nama file Anda

export default function JournalsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Mutasi Rekening Bank</h1>
      <TableMutasiBank />
    </div>
  );
}