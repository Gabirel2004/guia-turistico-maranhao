// Em: app/page.tsx

// 1. Voltamos a usar o nosso ficheiro 'lib/prisma' que gere a conexão
import prisma from '@/lib/prisma';
import ListaCidades from './componentes/ListaCidades'; 

export default async function Home() {
  // 2. CORREÇÃO: Usamos 'select' para ir buscar apenas os campos necessários.
  // Isto resolve o erro de tipo e torna a consulta mais eficiente.
  const cidades = await prisma.cidade.findMany({
    select: {
      id: true,
      nome: true,
      imagem: true,
      descricao: true,
      tipo: true, // Adicionado para consistência com o tipo
      localizacao: true,
      melhor_epoca: true,
      pontos_turisticos: true, // Adicionado para consistência com o tipo
    },
    orderBy: {
      nome: 'asc',
    },
  });

  return (
    <>
      <header className="text-center p-4 mb-5 bg-light text-dark">
        <h1 className="display-4 ">Guia Turístico do Maranhão</h1>
        <p className="lead">Explore os encantos do nosso estado.</p>
      </header>

      <main className="container">
        {/* Agora, os dados passados para 'ListaCidades' são simples e compatíveis */}
        <ListaCidades cidades={cidades} />
      </main>

      <footer className="text-center text-muted p-4 mt-5">
        <p>&copy; 2025 Guia Cultural do Maranhão. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
