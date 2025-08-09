// Em: app/cidades/[id]/page.tsx

import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ListaDePontos from '../../componentes/ListaDePontos';

export default async function PaginaDaCidade({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const cidade = await prisma.cidade.findUnique({
    where: { id },
    include: { pontos_turisticos: true },
  });

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
        <div className="card border-0 shadow-lg mb-5">
          <div className="row g-0">
            <div className="col-lg-6">
              <img
                src={cidade.imagem}
                alt={cidade.nome}
                className="img-fluid rounded-start w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
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
