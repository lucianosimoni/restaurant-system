import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bancada de Trabalho - Sabor Gáucho",
  description: "Criado por Luciano Simoni",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
