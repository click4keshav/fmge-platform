import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fornix FMGE | Connecting Knowledge to Memory",
  description: "High-yield FMGE preparation platform, QBank, and Grand Tests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f0e0e] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}