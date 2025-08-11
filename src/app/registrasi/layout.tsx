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
