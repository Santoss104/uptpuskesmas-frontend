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
];

export default function PatientList() {
  return (
    <div className={styles["table-card"]}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div className={styles["table-title"]}>Daftar Nama Pasien Puskesmas Pandau Jaya</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 14, color: "#23234c" }}>Search By</span>
            <select style={{ borderRadius: 8, padding: "4px 12px", border: "1px solid #e8eafc" }}>
              <option>Name</option>
              <option>Alamat</option>
              <option>Nomor</option>
            </select>
          </div>
          <button style={{
            background: "#2563eb",
            color: "#fff",
            borderRadius: "50%",
            width: 32,
            height: 32,
            border: "none",
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>+</button>
        </div>
      </div>
      <table className={styles["dashboard-table"]}>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Alamat</th>
            <th>Nomor Pendaftaran</th>
            <th>Tanggal Lahir</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, idx) => (
            <tr key={p.id}>
              <td>
                <input type="checkbox" checked readOnly style={{ accentColor: "#a78bfa" }} />
              </td>
              <td style={{ color: "#2563eb", fontWeight: 600 }}>{p.name}</td>
              <td>{p.alamat}</td>
              <td>{p.nomor}</td>
              <td>{p.lahir}</td>
              <td>
                <button className={styles["action-btn"]} style={{ background: "#4ade80" }}>
                  <span className="material-icons">edit</span>
                </button>
                <button className={styles["action-btn"]} style={{ background: "#f87171" }}>
                  <span className="material-icons">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <span style={{ color: "#888", fontSize: 14 }}>
          {patients.length} results found: Showing page 1 of 1
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            background: "#f3f4f6",
            color: "#888",
            borderRadius: 6,
            border: "none",
            padding: "4px 12px"
          }}>Previous</button>
          <button style={{
            background: "#a78bfa",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            padding: "4px 12px"
          }}>1</button>
          <button style={{
            background: "#f3f4f6",
            color: "#888",
            borderRadius: 6,
            border: "none",
            padding: "4px 12px"
          }}>2</button>
          <button style={{
            background: "#f3f4f6",
            color: "#888",
            borderRadius: 6,
            border: "none",
            padding: "4px 12px"
          }}>Next</button>
        </div>
      </div>
    </div>
  );
}