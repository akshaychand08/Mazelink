import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mazelink",
  description: "Smart URL Shortener & Earning Platform"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
