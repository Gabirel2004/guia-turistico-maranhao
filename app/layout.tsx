// Em: app/layout.tsx

import type { Metadata } from 'next';
// Importando as fontes que você configurou
import { Poppins, Montserrat } from 'next/font/google';

// 1. A importação do Bootstrap. O erro acontece aqui.
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

// Configurando a fonte principal (Poppins)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

// Configurando a fonte secundária (Montserrat)
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Guia Cultural do Maranhão',
  description: 'Explore os encantos, sabores e tradições do nosso estado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {/* Aplicando as fontes à tag <body> */}
      <body className={`${poppins.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
