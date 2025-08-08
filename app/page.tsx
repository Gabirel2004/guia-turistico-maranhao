// app/page.tsx
import { cidades } from '@/data/Cidades';
import ListaCidades from './componentes/ListaCidades'; // 1. Importando o novo componente

export default async function Home() {
  // como ainda nao coloquei um banco de dados vai fica assim
  const CidadesOrdenados = [...cidades].sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <>
      {/* Cabeçalho */}
      <header className="text-center p-4 mb-5 bg-light text-dark">
        <h1 className="display-4 ">Guia Turisco do Maranhão</h1>
        <p className="lead">Explore os encantos do nosso estado.</p>
      </header>

      {/* Container principal para o conteúdo */}
      <main className="container">
        <ListaCidades cidades = {CidadesOrdenados} />
      </main>

      <footer className="text-center text-muted p-4 mt-5">
        <p>&copy; 2025 Guia Cultural do Maranhão. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}