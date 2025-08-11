import styles from "../styles/loadingSpinner.module.css";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
  overlay?: boolean;
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "medium",
  overlay = true,
}: LoadingSpinnerProps) {
  const sizeClass =
    size === "small"
      ? styles.small
      : size === "large"
      ? styles.large
      : styles.medium;

  const content = (
    <>
      <div className={`${styles.spinner} ${sizeClass}`} />
      <div className={styles.message}>{message}</div>
    </>
  );

  if (overlay) {
    return <div className={styles.overlay}>{content}</div>;
  }

  return <div className={styles.container}>{content}</div>;
}
