// src/app/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children} {/* Tanpa Header dan Sidebar */}
      </body>
    </html>
  );
}
