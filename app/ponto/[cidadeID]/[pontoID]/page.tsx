// Em: app/ponto/[cidadeId]/[pontoId]/page.tsx

import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// CORREÇÃO: Os nomes dos parâmetros agora correspondem aos nomes das pastas
type PageProps = {
  params: {
    cidadeID: string;
    pontoID: string;
  };
};

// Esta página é um Componente de Servidor, por isso pode ser async
export default async function PontoTuristicoPage({ params }: PageProps) {
  const { cidadeID, pontoID } = params;

  const ponto = await prisma.pontoTuristico.findFirst({
    where: {
      id: pontoID,
      cidadeId: cidadeID,
    },
    include: {
      cidade: true,
    },
  });
  
  // Se o ponto não for encontrado, mostramos uma página 404.
  if (!ponto) {
    notFound();
  }

  return (
    <div className="container my-5">
      <div className="card border-0 shadow-lg">
        <div className="row g-0">
          
          {/* Coluna da Esquerda: Imagem do Ponto Turístico */}
          <div className="col-lg-7">
            <img
              src={ponto.imagem}
              alt={ponto.nome}
              className="img-fluid rounded-start w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Coluna da Direita: Informações */}
          <div className="col-lg-5 d-flex flex-column p-5">
            <h1 className="display-5 fw-bold">{ponto.nome}</h1>
            
            {/* Mostra a localização específica do ponto */}
            <p className="lead text-muted mb-4">
              {ponto.localizacao || ponto.cidade.nome}
            </p>

            <p className="fs-5 mb-4">{ponto.descricao}</p>
            
            {/* Botão para voltar para a página da cidade */}
            <div className="mt-auto">
              <Link href={`/cidades/${ponto.cidade.id}`} className="btn btn-primary btn-lg w-100">
                &larr; Ver todos os pontos de {ponto.cidade.nome}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
