import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { AuthProvider } from "../utils/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sistem Informasi Puskesmas",
  description: "Sistem Informasi Daftar Nama Pasien - Puskesmas Pandau Jaya",
  keywords: ["puskesmas", "pasien", "pandau jaya", "sistem informasi", "kesehatan"],
  authors: [{ name: "Puskesmas Pandau Jaya" }],
  creator: "Puskesmas Pandau Jaya",
  publisher: "Puskesmas Pandau Jaya",
  robots: "index, follow",
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/logo.png", 
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: {
      url: "/logo.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#059669",
};export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
