// Em: app/componentes/ListaLocais.tsx

"use client";

import { useState } from 'react';
import Link from 'next/link';


// Definimos o tipo de dados para um único local.
type cidade = {
  id: string;
  nome: string;
  tipo: string;
  imagem: string;
  descricao: string;
  localizacao?: string;
  melhor_epoca?: string;
  pontos_turisticos:
    {
      nome: string;
      descricao: string;
      imagem: string;
      localizacao?: string;
    } [];
};

// CORREÇÃO: Criamos um tipo específico para as propriedades que o componente espera.
type ListaLocaisProps = {
  cidades: cidade[];
};

// Usamos o novo tipo 'ListaLocaisProps' para definir as propriedades do componente.
export default function ListaCidades({ cidades }: ListaLocaisProps) {
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const cidadesFiltrados = cidades.filter((cidades) =>
    cidades.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const URL_erro = (e: React.SyntheticEvent<HTMLImageElement,Event>) => {
    e.currentTarget.onerror = null; // Remove o manipulador de erro para evitar loops
    e.currentTarget.src = 'https://placehold.co/400x400/ccc/fff?text=Imagem+Indisponível'; // Define uma imagem padrão
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="form-control form-control-lg"
          placeholder="Pesquisar por nome do local..."
        />
      </div>

      <div className="row">
        {cidadesFiltrados.length > 0 ? (
          cidadesFiltrados.map((cidade) => (
            <div key={cidade.id} className = "col-12 col-md-6 col-lg-4 mb-4 d-flex">
              <div className="card h-100 shadow-sm w-100 d-flex flex-column">
                <div className="card h-100 shadow-sm w-100">
                  <img
                    src = {cidade.imagem}
                    alt={cidade.nome}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={URL_erro}
                  />  
                  <div className='card-body d-flex flex-column'>  
                    <h5 className="card-title">{cidade.nome}</h5>
                    <p className="card-text">{cidade.descricao.substring(0, 120)}...</p>
                    <div className="text-center mt-auto">
                      <Link href={`/cidades/${cidade.id}`} className="btn btn-primary">
                        Saiba mais
                      </Link>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted">Nenhum cidade encontrada com esse nome.</p>
          </div>
        )}
      </div>
    </div>
  );
}
