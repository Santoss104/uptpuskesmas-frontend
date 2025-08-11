// src/app/login/layout.tsx
export default function LoginLayout({
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
