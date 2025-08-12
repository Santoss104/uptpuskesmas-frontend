"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/dashboard.module.css";
import Toast from "./Toast";
import LoadingSpinner from "./LoadingSpinner";
import modalStyles from "../styles/modal.module.css";
import ConfirmModal from "./ConfirmModal";
import CustomSelect from "./CustomSelect";
import apiClient from "../../utils/apiClient";
import { useAuth, isAdmin } from "../../utils/auth";

interface Patient {
  _id: string;
  name: string;
  address: string;
  registrationNumber: string;
  birthPlace: string;
  birthDay: string;
  createdAt: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalPatients: number;
  patientsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PAGE_SIZE = 25; // Increased for better performance with large datasets
const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function PatientList() {
  const { user } = useAuth();
  const userIsAdmin = isAdmin(user);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchType, setSearchType] = useState<"name" | "address" | "alphabet">(
    "name"
  );
  const [alphabet, setAlphabet] = useState<string>("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    registrationNumber: "",
    birthPlace: "",
    birthDay: "",
  });
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    registrationNumber: "",
    birthPlace: "",
    birthDay: "",
  });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  function formatRegistrationNumber(value: string) {
    // Extract letters and digits separately
    const letters = value.replace(/[^A-Z]/g, "").slice(0, 1); // Limit to 1 letter
    const digits = value.replace(/\D/g, "").slice(0, 9); // Limit to 9 digits

    if (digits.length <= 6) {
      const formatted = digits.match(/.{1,2}/g)?.join(".") ?? "";
      return formatted + (letters ? letters : "");
    } else if (digits.length <= 8) {
      // Format: XX.XX.XX.XX (8 digits) + optional letter
      const formatted = digits.match(/.{1,2}/g)?.join(".") ?? "";
      return formatted + (letters ? letters : "");
    } else {
      // Format: XX.XX.XX.XXX (9 digits) + optional letter
      const part1 = digits.slice(0, 2);
      const part2 = digits.slice(2, 4);
      const part3 = digits.slice(4, 6);
      const part4 = digits.slice(6, 9);
      let formatted = part1;
      if (part2) formatted += "." + part2;
      if (part3) formatted += "." + part3;
      if (part4) formatted += "." + part4;
      return formatted + (letters ? letters : "");
    }
  }

  function openConfirmModal({
    title,
    message,
    confirmText = "Ya",
    cancelText = "Batal",
    onConfirm,
  }: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  }) {
    setConfirmModal({
      open: true,
      title,
      message,
      confirmText,
      cancelText,
      loading: false,
      onConfirm,
    });
  }

  // Fetch patients data
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");
      let response;

      if (searchType === "name" && debouncedSearch.trim()) {
        response = await apiClient.searchPatientsByName(
          debouncedSearch.trim(),
          page,
          PAGE_SIZE
        );
      } else if (searchType === "address" && debouncedSearch.trim()) {
        response = await apiClient.searchPatientsByAddress(
          debouncedSearch.trim(),
          page,
          PAGE_SIZE
        );
      } else if (searchType === "alphabet" && alphabet) {
        response = await apiClient.getPatientsByAlphabet(
          alphabet,
          page,
          PAGE_SIZE
        );
      } else {
        response = await apiClient.getPatients({
          page,
          limit: PAGE_SIZE,
          sortBy: "registrationNumber",
          sortOrder: "asc",
        });
      }

      if (response.success && response.data) {
        setPatients(response.data.patients);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || "Gagal memuat data pasien");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal memuat data pasien";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchPatients();
    // eslint-disable-next-line
  }, [page, debouncedSearch, searchType, alphabet]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, searchType, alphabet]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const openModal = () => {
    setForm({
      name: "",
      address: "",
      registrationNumber: "",
      birthPlace: "",
      birthDay: "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({
      name: "",
      address: "",
      registrationNumber: "",
      birthPlace: "",
      birthDay: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const errors: string[] = [];

    if (!form.name.trim()) errors.push("Nama harus diisi");
    if (!form.address.trim()) errors.push("Alamat harus diisi");
    if (!form.registrationNumber.trim())
      errors.push("Nomor pendaftaran harus diisi");
    if (!form.birthPlace.trim()) errors.push("Tempat lahir harus diisi");
    if (!form.birthDay) errors.push("Tanggal lahir harus diisi");

    const regNumPattern = /^\d{2}\.\d{2}\.\d{2}\.\d{2,3}[A-Z]?$/;
    if (
      form.registrationNumber &&
      !regNumPattern.test(form.registrationNumber)
    ) {
      errors.push(
        "Format nomor pendaftaran harus XX.XX.XX.XX, XX.XX.XX.XXX, XX.XX.XX.XX[A-Z], atau XX.XX.XX.XXX[A-Z]"
      );
    }

    if (errors.length > 0) {
      showToast(errors.join(", "), "error");
      return;
    }

    openConfirmModal({
      title: "Konfirmasi Tambah",
      message: "Apakah Anda yakin ingin menambah pasien ini?",
      confirmText: "Tambah",
      cancelText: "Batal",
      onConfirm: async () => {
        setConfirmModal((prev) => prev && { ...prev, loading: true });
        try {
          const response = await apiClient.createPatient(form);
          if (response.success) {
            showToast("Pasien berhasil ditambahkan!", "success");
            closeModal();
            fetchPatients();
          }
        } catch (error) {
          showToast(
            "Gagal menambahkan pasien: " +
              (error instanceof Error ? error.message : "Unknown error"),
            "error"
          );
        } finally {
          setConfirmModal(null);
        }
      },
    });
  };

  const openEditModal = (patient: Patient) => {
    setEditForm({
      name: patient.name,
      address: patient.address,
      registrationNumber: patient.registrationNumber,
      birthPlace: patient.birthPlace,
      birthDay: patient.birthDay.split("T")[0],
    });
    setEditId(patient._id);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditForm({
      name: "",
      address: "",
      registrationNumber: "",
      birthPlace: "",
      birthDay: "",
    });
    setEditId(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editId ||
      !editForm.name ||
      !editForm.address ||
      !editForm.registrationNumber ||
      !editForm.birthPlace ||
      !editForm.birthDay
    ) {
      showToast("Semua field harus diisi!", "error");
      return;
    }

    const regNumPattern = /^\d{2}\.\d{2}\.\d{2}\.\d{2,3}[A-Z]?$/;
    if (!regNumPattern.test(editForm.registrationNumber)) {
      showToast(
        "Format nomor pendaftaran harus XX.XX.XX.XX, XX.XX.XX.XXX, XX.XX.XX.XX[A-Z], atau XX.XX.XX.XXX[A-Z]",
        "error"
      );
      return;
    }

    openConfirmModal({
      title: "Konfirmasi Update",
      message: "Apakah Anda yakin ingin mengupdate data pasien ini?",
      confirmText: "Update",
      cancelText: "Batal",
      onConfirm: async () => {
        setConfirmModal((prev) => prev && { ...prev, loading: true });
        try {
          const response = await apiClient.updatePatient(editId, editForm);
          if (response.success) {
            showToast("Pasien berhasil diupdate!", "success");
            closeEditModal();
            fetchPatients();
          }
        } catch (error) {
          showToast(
            "Gagal mengupdate pasien: " +
              (error instanceof Error ? error.message : "Unknown error"),
            "error"
          );
        } finally {
          setConfirmModal(null);
        }
      },
    });
  };

  const handleDelete = (id: string, name: string) => {
    openConfirmModal({
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus pasien "${name}"?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      onConfirm: async () => {
        setConfirmModal((prev) => prev && { ...prev, loading: true });
        try {
          const response = await apiClient.deletePatient(id);
          if (response.success) {
            showToast("Pasien berhasil dihapus!", "success");
            fetchPatients();
          }
        } catch (error) {
          showToast(
            "Gagal menghapus pasien: " +
              (error instanceof Error ? error.message : "Unknown error"),
            "error"
          );
        } finally {
          setConfirmModal(null);
        }
      },
    });
  };

  // Export Excel
  const handleExport = async () => {
    try {
      const res = await apiClient.exportPatientsToExcel();
      const blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `patients_data_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast("Data pasien berhasil diexport!", "success");
    } catch {
      showToast("Gagal export data pasien", "error");
    }
  };

  // Import Excel
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("excelFile", file);

    openConfirmModal({
      title: "Konfirmasi Import",
      message: "Apakah Anda yakin ingin mengimport data pasien dari file ini?",
      confirmText: "Import",
      cancelText: "Batal",
      onConfirm: async () => {
        setConfirmModal((prev) => prev && { ...prev, loading: true });
        try {
          const response = await apiClient.importPatientsFromExcel(formData);
          if (response.success) {
            showToast(
              "Import selesai: " +
                (response.results?.success ?? 0) +
                " berhasil, " +
                (response.results?.failed ?? 0) +
                " gagal",
              "success"
            );
            fetchPatients();
          } else {
            showToast(
              "Import gagal: " + (response.message || "Unknown error"),
              "error"
            );
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          showToast("Gagal import data pasien", "error");
        } finally {
          setConfirmModal(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      },
    });
  };

  // Download template
  const handleDownloadTemplate = async () => {
    try {
      const res = await apiClient.downloadExcelTemplate();
      const blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "patient_import_template.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast("Template berhasil diunduh!", "success");
    } catch {
      showToast("Gagal download template", "error");
    }
  };

  // Search type change
  const handleSearchTypeChange = (type: "name" | "address" | "alphabet") => {
    setSearchType(type);
    setSearch("");
    setAlphabet("");
  };

  // Alphabet search
  const handleAlphabetClick = (letter: string) => {
    setSearchType("alphabet");
    setAlphabet(letter);
    setSearch("");
  };

  const changePage = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Memuat data pasien..." />;
  }

  if (error) {
    return (
      <div className={styles["dashboard-bg"]}>
        <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
          {error}
          <br />
          <button onClick={fetchPatients} style={{ marginTop: "10px" }}>
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["dashboard-bg"]}>
      <div className={styles["dashboard-title"]}>Daftar Pasien</div>

      {/* Search & Add & Export/Import */}
      <div className={styles["search-add-container"]}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <CustomSelect
            value={searchType}
            onChange={(value) =>
              handleSearchTypeChange(value as "name" | "address" | "alphabet")
            }
            options={[
              { value: "name", label: "Cari Nama" },
              { value: "address", label: "Cari Alamat" },
              { value: "alphabet", label: "Cari Alfabet" },
            ]}
            placeholder="Pilih jenis pencarian"
          />
          {searchType !== "alphabet" ? (
            <input
              type="text"
              placeholder={
                searchType === "name"
                  ? "Cari nama pasien..."
                  : searchType === "address"
                  ? "Cari alamat pasien..."
                  : "Cari pasien..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles["search-input"]}
            />
          ) : (
            <div className={styles["alphabet-search"]}>
              {ALPHABETS.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  className={
                    alphabet === letter
                      ? styles["alphabet-active"]
                      : styles["alphabet-button"]
                  }
                  onClick={() => handleAlphabetClick(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {userIsAdmin && (
            <>
              <button onClick={openModal} className={styles["add-button"]}>
                + Tambah Pasien
              </button>
              <button
                onClick={handleExport}
                className={styles["export-button"]}
              >
                Export Excel
              </button>
              <button
                onClick={handleDownloadTemplate}
                className={styles["template-button"]}
              >
                Download Template
              </button>
              <label className={styles["import-label"]}>
                Import Excel
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImport}
                />
              </label>
            </>
          )}
        </div>
      </div>

      {/* Patients Table */}
      <div className={styles["table-card"]}>
        <table className={styles["dashboard-table"]}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>No. Pendaftaran</th>
              <th>Tempat Lahir</th>
              <th>Tanggal Lahir</th>
              {userIsAdmin && <th>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient, index) => (
                <tr key={patient._id}>
                  <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td>{patient.name}</td>
                  <td>{patient.address}</td>
                  <td>{patient.registrationNumber}</td>
                  <td>{patient.birthPlace}</td>
                  <td>{formatDate(patient.birthDay)}</td>
                  {userIsAdmin && (
                    <td>
                      <button
                        onClick={() => openEditModal(patient)}
                        className={styles["edit-button"]}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(patient._id, patient.name)}
                        className={styles["delete-button"]}
                      >
                        Hapus
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={userIsAdmin ? 7 : 6}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  {search || alphabet
                    ? `Tidak ada pasien yang ditemukan`
                    : "Tidak ada data pasien"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className={styles["pagination"]}>
          <button
            onClick={() => changePage(page - 1)}
            disabled={!pagination.hasPrevPage}
            className={styles["pagination-button"]}
          >
            Previous
          </button>

          <span className={styles["pagination-info"]}>
            Halaman {pagination.currentPage} dari {pagination.totalPages} (
            {pagination.totalPatients} total pasien)
          </span>

          <button
            onClick={() => changePage(page + 1)}
            disabled={!pagination.hasNextPage}
            className={styles["pagination-button"]}
          >
            Next
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Add Patient Modal */}
      {showModal && (
        <div className={modalStyles.overlay}>
          <div className={modalStyles.modal}>
            <h3
              style={{
                margin: "0 0 24px 0",
                fontSize: "24px",
                fontWeight: "600",
                color: "#1e293b",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Tambah Pasien Baru
            </h3>
            <form onSubmit={handleSubmit}>
              <div className={styles["form-group"]}>
                <label>Nama:</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Alamat:</label>
                <textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>No. Pendaftaran:</label>
                <input
                  type="text"
                  value={form.registrationNumber}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      registrationNumber: formatRegistrationNumber(
                        e.target.value
                      ),
                    })
                  }
                  maxLength={13}
                  placeholder="XX.XX.XX.XX, XX.XX.XX.XXX, XX.XX.XX.XX[A-Z], atau XX.XX.XX.XXX[A-Z]"
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Tempat Lahir:</label>
                <input
                  type="text"
                  value={form.birthPlace}
                  onChange={(e) =>
                    setForm({ ...form, birthPlace: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Tanggal Lahir:</label>
                <input
                  type="date"
                  value={form.birthDay}
                  onChange={(e) =>
                    setForm({ ...form, birthDay: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles["form-actions"]}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles["cancel-button"]}
                >
                  Batal
                </button>
                <button type="submit" className={styles["submit-button"]}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {editModal && (
        <div className={modalStyles.overlay}>
          <div className={modalStyles.modal}>
            <h3
              style={{
                margin: "0 0 24px 0",
                fontSize: "24px",
                fontWeight: "600",
                color: "#1e293b",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Edit Pasien
            </h3>
            <form onSubmit={handleEditSubmit}>
              <div className={styles["form-group"]}>
                <label>Nama:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Alamat:</label>
                <textarea
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({ ...editForm, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>No. Pendaftaran:</label>
                <input
                  type="text"
                  value={editForm.registrationNumber}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      registrationNumber: formatRegistrationNumber(
                        e.target.value
                      ),
                    })
                  }
                  maxLength={13}
                  placeholder="XX.XX.XX.XX, XX.XX.XX.XXX, XX.XX.XX.XX[A-Z], atau XX.XX.XX.XXX[A-Z]"
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Tempat Lahir:</label>
                <input
                  type="text"
                  value={editForm.birthPlace}
                  onChange={(e) =>
                    setEditForm({ ...editForm, birthPlace: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label>Tanggal Lahir:</label>
                <input
                  type="date"
                  value={editForm.birthDay}
                  onChange={(e) =>
                    setEditForm({ ...editForm, birthDay: e.target.value })
                  }
                  required
                />
              </div>
              <div className={styles["form-actions"]}>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className={styles["cancel-button"]}
                >
                  Batal
                </button>
                <button type="submit" className={styles["submit-button"]}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Universal Confirm Modal */}
      {confirmModal && (
        <ConfirmModal
          open={confirmModal.open}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.confirmText}
          cancelText={confirmModal.cancelText}
          loading={confirmModal.loading}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}
    </div>
  );
}
