// Em: app/locais/[id]/page.tsx

import { cidades } from '@/data/Cidades';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Definimos os tipos de dados que a página vai receber
type PageProps = {
  params: {
    id: string;
  };
};

// Função para encontrar os dados do local usando o ID
function getCidadeData(id: string) {
  const cidade = cidades.find((item) => item.id === id);

  if (!cidade) {
    notFound();
  }
  return cidade;
}

// O componente da página de detalhes
export default function DetalhesPage({ params }: PageProps) {
  const cidade = getCidadeData(params.id);

  return (
    <>
      {/* O cabeçalho e o rodapé podem ser movidos para um componente de Layout no futuro */}
      <header className="text-center p-4 mb-5 bg-light text-dark">
        <h1 className="display-4">Guia Turístico do Maranhão</h1>
        <p className="lead">Explore os encantos, sabores e tradições do nosso estado.</p>
      </header>

      <main className="container my-5">
        {/* Usamos um card para envolver todo o conteúdo e adicionar uma sombra */}
        <div className="card border-0 shadow-lg">
          <div className="row g-0">
            
            {/* Coluna da Esquerda: Imagem */}
            <div className="col-lg-6">
              <img
                src={cidade.pontos_turisticos[0].imagem}
                alt={cidade.pontos_turisticos[0].nome}
                className="img-fluid rounded-start w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Coluna da Direita: Informações */}
            <div className="col-lg-6 d-flex flex-column p-5">
              <h1 className="display-4 fw-bold">{cidade.pontos_turisticos[0].nome}</h1>

              <p className="fs-5 mb-4">{cidade.pontos_turisticos[0].descricao}</p>
              
              <div className="card bg-light border-0 mb-4">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Detalhes</h5>
                  <ul className="list-unstyled mb-0">
                    {cidade.localizacao && (
                      <li><strong>Localização:</strong> {cidade.pontos_turisticos[0].localizacao}</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Botão de Ação e Link para Voltar */}
              <div className="mt-auto">
             <Link href= {`/pontos_turisticos/${cidade.id}`} className="btn btn-primary btn-lg w-100 mb-3">
                  Explorar Pontos Turísticos
                </Link>
                <div className="text-center">
                  <Link href="/" className="text-decoration-none text-muted small">
                    &larr; Voltar para a lista
                  </Link>
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </main>

      <footer className="text-center text-muted p-4 mt-5">
        <p>&copy; 2025 Guia Cultural do Maranhão. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}