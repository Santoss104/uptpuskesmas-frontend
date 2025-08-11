import React from "react";
import modalStyles from "../styles/modal.module.css";
import styles from "../styles/dashboard.module.css";
import LoadingSpinner from "./LoadingSpinner";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Ya",
  cancelText = "Batal",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modal}>
        {loading && (
          <div className={modalStyles.loadingOverlay}>
            <LoadingSpinner
              message="Memproses..."
              size="small"
              overlay={false}
            />
          </div>
        )}

        <div style={{ marginBottom: "24px" }}>
          {title && (
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "20px",
                fontWeight: "600",
                color: "#1e293b",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {title}
            </h3>
          )}
          <p
            style={{
              margin: "0",
              fontSize: "16px",
              color: "#475569",
              lineHeight: "1.5",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {message}
          </p>
        </div>

        <div className={styles["form-actions"]}>
          <button
            type="button"
            onClick={onCancel}
            className={styles["cancel-button"]}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={styles["delete-button"]}
            disabled={loading}
          >
            {loading ? (
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div className={modalStyles.buttonSpinner}></div>
                Memproses...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
