// src/app/login/layout.tsx
export default function RegistrasiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children} {/* Tanpa Header dan Sidebar */}
      </body>
    </html>
  );
}