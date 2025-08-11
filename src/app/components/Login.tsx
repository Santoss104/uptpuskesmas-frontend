"use client";
import React from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../utils/auth";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  // Check for success message from registration
  React.useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(message);
      router.replace("/login");
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      console.log("🔑 Starting login process...");
      await login(email, password);
      console.log("✅ Login successful, redirecting to dashboard...");

      await new Promise((resolve) => setTimeout(resolve, 500));

      router.replace("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login gagal. Silakan coba lagi.";
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.bg}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logoSection}>
          <Image
            src="/logo.png"
            alt="Logo"
            className={styles.logo}
            width={60}
            height={60}
          />
          <div>
            <h2 className={styles.title}>
              SISTEM INFORMASI
              <br />
              DAFTAR NAMA PASIEN
            </h2>
            <p className={styles.subtitle}>PUSKESMAS PANDAU JAYA</p>
          </div>
        </div>

        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Input email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Input password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        {successMessage && (
          <div className={styles.success}>{successMessage}</div>
        )}
        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "LOADING..." : "LOGIN"}
        </button>

        <p className={styles.switchText}>
          Belum punya akun? <Link href="/registrasi">Daftar</Link>
        </p>
      </form>
    </div>
  );
}
