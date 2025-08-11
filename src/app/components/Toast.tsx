import React, { useEffect } from "react";
import styles from "../styles/toast.module.css";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  onClose,
  autoClose = true,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "✓";
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.content}>
        <span className={styles.icon}>{getIcon()}</span>
        <span className={styles.message}>{message}</span>
      </div>
      <button className={styles.close} onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}
