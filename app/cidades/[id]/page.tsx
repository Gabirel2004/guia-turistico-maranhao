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
  
  const awaiteparams = await params; 

  const cidade = await prisma.cidade.findUnique({
    where: {
      id: awaiteparams.id,
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
        <h1 className="display-4">Guia Turístico do Maranhão</h1>
        <p className="lead">Explore os encantos do nosso estado.</p>
      </header>

      <main className="container my-5">
        {/* Bloco Principal com os Detalhes da Cidade */}
        <div className="card border-0 shadow-lg mb-5">
          <div className="row g-0">
            {/* Coluna da Esquerda: Imagem da Cidade */}
            <div className="col-lg-6">
              <img
                src={cidade.imagem}
                alt={cidade.nome}
                className="img-fluid rounded-start w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Coluna da Direita: Informações da Cidade */}
            <div className="col-lg-6 d-flex flex-column p-5">
              <h1 className="display-4 fw-bold">{cidade.nome}</h1>
              <p className="lead text-muted mb-4">{cidade.tipo}</p>
              <p className="fs-5 mb-4">{cidade.descricao}</p>
              
              <div className="card bg-light border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Detalhes</h5>
                  <ul className="list-unstyled mb-0">
                    {cidade.localizacao && (
                      <li><strong>Localização:</strong> {cidade.localizacao}</li>
                    )}
                    {cidade.melhor_epoca && (
                      <li><strong>Melhor Época:</strong> {cidade.melhor_epoca}</li>
                    )}
                     <li>
                       <strong>Pontos Turísticos:</strong> {cidade.pontos_turisticos.length}
                     </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Novo Bloco: Lista de Pontos Turísticos da Cidade */}
        <div className="mt-5">
            <h2 className="text-center display-5 mb-4">Explore {cidade.nome}</h2>
            <ListaDePontos pontos={cidade.pontos_turisticos} cidadeId={cidade.id} />
        </div>
        
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
