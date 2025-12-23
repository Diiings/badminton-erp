import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Badminton ERP System",
  description: "Sistem Manufaktur & Retail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}