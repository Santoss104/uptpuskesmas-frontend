"use client";
import React from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../utils/auth";

export default function SignUp() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Semua field harus diisi");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Password harus minimal 6 karakter");
      return;
    }

    try {
      await register({ email, password, confirmPassword });
      router.push(
        "/login?message=Registrasi berhasil! Silakan login dengan akun yang baru dibuat."
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registrasi gagal. Silakan coba lagi.";
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

        <label className={styles.label}>Confirm Password</label>
        <input
          type="password"
          placeholder="Input password again"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "LOADING..." : "DAFTAR"}
        </button>

        <p className={styles.switchText}>
          Punya akun? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
