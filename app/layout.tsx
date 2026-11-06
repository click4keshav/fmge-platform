import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FMGE Boosters Platform',
  description: 'Exam preparation platform for FMGE aspirants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0f1115] text-slate-100 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}