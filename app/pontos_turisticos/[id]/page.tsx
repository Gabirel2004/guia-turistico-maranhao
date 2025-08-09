// Em: app/cidades/[id]/page.tsx

import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
// Importamos o nosso componente de cliente que terá a parte interativa
import ListaDePontos from '../../componentes/ListaDePontos';

type PageProps = {
  params: {
    id: string;
  };
};

// A página agora é um componente de servidor, responsável apenas por buscar dados
export default async function PaginaDaCidade({ params }: PageProps) {
  // 1. Buscamos os dados da cidade e dos seus pontos turísticos aqui, no servidor.
  const cidade = await prisma.cidade.findUnique({
    where: {
      id: params.id,
    },
    include: {
      // Pedimos ao Prisma para incluir os pontos turísticos relacionados
      pontos_turisticos: true,
    },
  });

  // Se a cidade não for encontrada, mostramos um erro 404
  if (!cidade) {
    notFound();
  }

  return (
    <>
      <header className="text-center p-4 mb-5 bg-light text-dark">
        <h1 className="display-4">Pontos Turísticos de {cidade.nome}</h1>
        <p className="lead">{cidade.descricao}</p>
      </header>

      <main className="container">
        {/* 2. Passamos a lista de pontos turísticos para o nosso Componente de Cliente */}
        <ListaDePontos pontos={cidade.pontos_turisticos} cidadeId={cidade.id} />
        
        <div className="text-center mt-5">
          <Link href="/" className="btn btn-primary btn-lg">
            &larr; Ver Todas as Cidades
          </Link>
        </div>
      </main>

      <footer className="text-center text-muted p-4 mt-5">
        <p>&copy; 2025 Guia Cultural do Maranhão. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
