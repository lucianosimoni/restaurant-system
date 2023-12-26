import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurante 🍽️",
  description: "Criado por Luciano Simoni",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
