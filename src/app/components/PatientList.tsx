'use client';
import React from "react";
import styles from "../styles/dashboard.module.css";

const patients = [
  { id: 1, name: "Revi", alamat: "Karya 1", nomor: "0090909090901", lahir: "18-09-2003" },
  { id: 2, name: "Ikhlas", alamat: "Karya 1", nomor: "0090909090902", lahir: "18-10-2003" },
  { id: 3, name: "Azizi", alamat: "Karya 1", nomor: "0090909090903", lahir: "12-01-2004" },
  { id: 4, name: "Rehan", alamat: "Karya 1", nomor: "0090909090904", lahir: "18-09-2004" },
  { id: 5, name: "Reus", alamat: "Karya 1", nomor: "0090909090905", lahir: "18-09-2004" },
  { id: 6, name: "Sulton", alamat: "Karya 1", nomor: "0090909090906", lahir: "18-09-2003" },
  { id: 7, name: "Kepin", alamat: "Karya 1", nomor: "0090909090907", lahir: "18-09-2003" },
  { id: 8, name: "Ajit", alamat: "Karya 1", nomor: "0090909090908", lahir: "18-09-2003" },
  { id: 9, name: "Revi", alamat: "Karya 1", nomor: "0090909090901", lahir: "18-09-2003" },
  { id: 10, name: "Ikhlas", alamat: "Karya 1", nomor: "0090909090902", lahir: "18-10-2003" },
  { id: 11, name: "Azizi", alamat: "Karya 1", nomor: "0090909090903", lahir: "12-01-2004" },
  { id: 12, name: "Rehan", alamat: "Karya 1", nomor: "0090909090904", lahir: "18-09-2004" },
  { id: 13, name: "Reus", alamat: "Karya 1", nomor: "0090909090905", lahir: "18-09-2004" },
  { id: 14, name: "Sulton", alamat: "Karya 1", nomor: "0090909090906", lahir: "18-09-2003" },
  { id: 15, name: "Kepin", alamat: "Karya 1", nomor: "0090909090907", lahir: "18-09-2003" },
  { id: 16, name: "Ajit", alamat: "Karya 1", nomor: "0090909090908", lahir: "18-09-2003" },
  // Tambahkan data lebih banyak sesuai kebutuhan
];

const PAGE_SIZE = 12;

export default function PatientList() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [patientList, setPatientList] = React.useState(patients);
  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    alamat: "",
    nomor: "",
    lahir: ""
  });
  const [editModal, setEditModal] = React.useState(false);
  const [editIdx, setEditIdx] = React.useState<number | null>(null);
  const [editForm, setEditForm] = React.useState({
    name: "",
    alamat: "",
    nomor: "",
    lahir: ""
  });

  // Filter pasien sesuai search
  const filteredPatients = patientList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / PAGE_SIZE);
  const paginatedPatients = filteredPatients.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Reset ke halaman 1 jika search berubah
  React.useEffect(() => {
    setPage(1);
  }, [search]);

  const handleCreate = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ name: "", alamat: "", nomor: "", lahir: "" });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.alamat || !form.nomor || !form.lahir) return;
    const newPatient = {
      id: patientList.length + 1,
      name: form.name,
      alamat: form.alamat,
      nomor: form.nomor,
      lahir: form.lahir
    };
    setPatientList([newPatient, ...patientList]);
    handleCloseModal();
  };

  // Hapus pasien
  const handleDelete = (id: number) => {
    setPatientList(patientList.filter((p) => p.id !== id));
  };

  // Edit pasien
  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    const p = paginatedPatients[idx];
    setEditForm({
      name: p.name,
      alamat: p.alamat,
      nomor: p.nomor,
      lahir: p.lahir
    });
    setEditModal(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIdx === null) return;
    // Cari index asli di patientList
    const realIdx = patientList.findIndex((p) => p.id === paginatedPatients[editIdx].id);
    if (realIdx === -1) return;
    const updated = [...patientList];
    updated[realIdx] = {
      ...updated[realIdx],
      name: editForm.name,
      alamat: editForm.alamat,
      nomor: editForm.nomor,
      lahir: editForm.lahir
    };
    setPatientList(updated);
    setEditModal(false);
    setEditIdx(null);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setEditIdx(null);
  };

  return (
    <div
      className={styles["table-card"]}
      style={{
        minHeight: "calc(100vh - 60px)",
        height: "calc(100vh - 60px)",
        background: "#fff",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className={styles["table-title"]} style={{ fontSize: 18 }}>
          Daftar Nama Pasien Puskesmas Pandau Jaya
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="text"
            placeholder="Cari nama pasien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #e8eafc",
              fontSize: 13,
              width: 180,
            }}
          />
          <button
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: "none",
              background: "#a78bfa",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer"
            }}
            onClick={() => alert("Export data pasien!")}
          >
            Export
          </button>
          <button
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer"
            }}
            onClick={() => alert("Import data pasien!")}
          >
            Import
          </button>
          <button
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: "none",
              background: "#4ade80",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer"
            }}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
      <table
        className={styles["dashboard-table"]}
        style={{ fontSize: 13, width: "100%" }}
      >
        <thead>
          <tr>
            <th style={{ padding: "6px 8px" }}>No</th>
            <th style={{ padding: "6px 8px" }}>Patient Name</th>
            <th style={{ padding: "6px 8px" }}>Alamat</th>
            <th style={{ padding: "6px 8px" }}>Nomor Pendaftaran</th>
            <th style={{ padding: "6px 8px" }}>Tanggal Lahir</th>
            <th style={{ padding: "6px 8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPatients.map((p, idx) => (
            <tr key={p.id}>
              <td style={{ padding: "6px 8px" }}>
                {(page - 1) * PAGE_SIZE + idx + 1}
              </td>
              <td style={{ color: "#2563eb", fontWeight: 600, padding: "6px 8px" }}>{p.name}</td>
              <td style={{ padding: "6px 8px" }}>{p.alamat}</td>
              <td style={{ padding: "6px 8px" }}>{p.nomor}</td>
              <td style={{ padding: "6px 8px" }}>{p.lahir}</td>
              <td style={{ padding: "6px 8px" }}>
                <button
                  className={styles["action-btn"]}
                  style={{ background: "#4ade80", fontSize: 13, marginRight: 4 }}
                  onClick={() => handleEdit(idx)}
                >
                  <span className="material-icons">edit</span>
                </button>
                <button
                  className={styles["action-btn"]}
                  style={{ background: "#ff4444ff", fontSize: 13 }}
                  onClick={() => handleDelete(p.id)}
                >
                  <span className="material-icons">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Create Pasien */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 12,
            padding: 32,
            minWidth: 340,
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Tambah Pasien Baru</div>
            <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="text"
                name="name"
                placeholder="Nama Pasien"
                value={form.name}
                onChange={handleFormChange}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e8eafc", fontSize: 13 }}
                required
              />
              <input
                type="text"
                name="alamat"
                placeholder="Alamat"
                value={form.alamat}
                onChange={handleFormChange}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e8eafc", fontSize: 13 }}
                required
              />
              <input
                type="text"
                name="nomor"
                placeholder="Nomor Pendaftaran"
                value={form.nomor}
                onChange={handleFormChange}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e8eafc", fontSize: 13 }}
                required
              />
              <input
                type="date"
                name="lahir"
                placeholder="Tanggal Lahir"
                value={form.lahir}
                onChange={handleFormChange}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e8eafc", fontSize: 13 }}
                required
              />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{ background: "#4ade80", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13 }}
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ background: "#e8eafc", color: "#2563eb", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13 }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Pasien */}
      {editModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 12,
            padding: 32,
            minWidth: 340,
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Edit Data Pasien</div>
            <form onSubmit={handleEditFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="text"
                name="name"
                placeholder="Nama Pasien"
                value={editForm.name}
                onChange={handleEditFormChange}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e8eafc", fontSize: 13 }}
                required
              />
              <input
                type="text"
                name="alamat"
                placeholder="Alamat"
                value={editForm.alamat}
                onChange={handleEditFormChange}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e8eafc", fontSize: 13 }}
                required
              />
              <input
                type="text"
                name="nomor"
                placeholder="Nomor Pendaftaran"
                value={editForm.nomor}
                onChange={handleEditFormChange}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e8eafc", fontSize: 13 }}
                required
              />
              <input
                type="date"
                name="lahir"
                placeholder="Tanggal Lahir"
                value={editForm.lahir}
                onChange={handleEditFormChange}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e8eafc", fontSize: 13 }}
                required
              />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13 }}
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  style={{ background: "#e8eafc", color: "#2563eb", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13 }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <span style={{ color: "#888", fontSize: 13 }}>
          {filteredPatients.length} results found: Showing page {page} of {totalPages}
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              background: "#f3f4f6",
              color: "#888",
              borderRadius: 6,
              border: "none",
              padding: "4px 12px",
              fontSize: 13,
            }}
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              style={{
                background: page === i + 1 ? "#a78bfa" : "#f3f4f6",
                color: page === i + 1 ? "#fff" : "#888",
                borderRadius: 6,
                border: "none",
                padding: "4px 12px",
                fontSize: 13,
              }}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            style={{
              background: "#f3f4f6",
              color: "#888",
              borderRadius: 6,
              border: "none",
              padding: "4px 12px",
              fontSize: 13,
            }}
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}