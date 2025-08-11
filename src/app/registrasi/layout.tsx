// src/app/registrasi/layout.tsx
export default function RegistrasiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      {children} {/* Tanpa Header dan Sidebar */}
    </div>
  );
}
