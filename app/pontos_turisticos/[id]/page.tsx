// Em: app/cidades/[id]/page.tsx

// 1. Este ficheiro agora é um Componente de Servidor (sem "use client")
import { cidades } from '@/data/Cidades';
import { notFound } from 'next/navigation';
import Link from 'next/link';
// 2. Importamos o novo componente que terá a parte interativa
import ListaDePontos from '../../componentes/ListaDePontos';

type PageProps = {
  params: {
    id: string;
  };
};

function getCidadeData(id: string) {
  const cidade = cidades.find((item) => item.id === id);
  if (!cidade) {
    notFound();
  }
  return cidade;
}

// A página agora é um componente de servidor, responsável apenas por buscar dados
export default function PaginaDaCidade({ params }: PageProps) {
  // 3. Buscamos os dados da cidade aqui, no servidor.
  const cidade = getCidadeData(params.id);

  return (
    <>
      <header className="text-center p-4 mb-5 bg-light text-dark">
        <h1 className="display-4">Pontos Turísticos de {cidade.nome}</h1>
        <p className="lead">{cidade.descricao}</p>
      </header>

      <main className="container">

        <ListaDePontos pontos={cidade.pontos_turisticos} />
        
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
