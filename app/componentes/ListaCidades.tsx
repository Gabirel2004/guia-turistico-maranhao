// Em: app/componentes/ListaCidades.tsx

"use client"; // Este componente precisa de interatividade (useState), por isso é um Componente de Cliente.

import { useState } from 'react';
import Link from 'next/link';


// A convenção para nomes de tipos é usar PascalCase (ex: Cidade)
type PontoTuristico = {
  id: string; // Adicionado para uma chave única
  nome: string;
  descricao: string;
  imagem: string;
};

type Cidade = {
  id: string;
  nome: string;
  tipo: string;
  imagem: string;
  descricao: string;
  pontos_turisticos: PontoTuristico[];
};

// Definimos um tipo para as propriedades que este componente recebe
type ListaCidadesProps = {
  cidades: Cidade[]; // Ele espera receber uma lista de cidades
};

// O nome do componente foi ajustado para refletir que ele lista cidades
export default function ListaCidades({ cidades }: ListaCidadesProps) {
  const [termoPesquisa, setTermoPesquisa] = useState('');

  // A lógica de filtro agora procura pelo nome da cidade
  const cidadesFiltradas = cidades.filter((cidade) =>
    cidade.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <div>
      {/* Barra de Pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="form-control form-control-lg"
          placeholder="Pesquisar por cidade..."
        />
      </div>

      {/* Grelha de Cidades */}
      <div className="row">
        {cidadesFiltradas.length > 0 ? (
          cidadesFiltradas.map((cidade) => (
            <div key={cidade.id} className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
              <div className="card h-100 shadow-sm w-100">
                <img 
                  src={cidade.imagem}
                  alt={cidade.nome}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{cidade.nome}</h5>
                  <p className="card-text">{cidade.descricao.substring(0, 120)}...</p>
                  <div className="text-center mt-auto">
                    {/* O link agora leva para a página de detalhes da cidade específica */}
                    <Link href={`/cidades/${cidade.id}`} className="btn btn-primary">
                      Saiba Mais
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted">Nenhuma cidade encontrada com esse nome.</p>
          </div>
        )}
      </div>
    </div>
  );
}
