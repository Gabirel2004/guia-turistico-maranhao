// Em: app/componentes/ListaDePontos.tsx

"use client";

import { useState } from 'react';
import Link from 'next/link';

// Definimos os tipos de dados que o componente recebe
type PontoTuristico = {
  id: string; // O ID é crucial para a 'key' e para os links
  nome: string;
  descricao: string;
  imagem: string;
  localizacao?: string | null;
};

type ListaProps = {
  pontos: PontoTuristico[];
  cidadeId: string;
};

export default function ListaDePontos({ pontos, cidadeId }: ListaProps) {
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const pontosFiltrados = pontos.filter((ponto) =>
    ponto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <div>
      {/* Caixa de Pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="form-control form-control-lg"
          placeholder="Pesquisar por ponto turístico nesta cidade..."
        />
      </div>

      {/* Grelha de Pontos Turísticos */}
      {pontosFiltrados.length > 0 ? (
        <div className="row">
          {pontosFiltrados.map((ponto) => (
            // CORREÇÃO APLICADA AQUI: Adicionámos a propriedade 'key' com o ID único do ponto.
            <div key={ponto.id} className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
              <div className="card h-100 shadow-sm w-100">
                <img

                  src={ponto.imagem}
                  alt={ponto.nome}
                  className="card-img-top"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Evita loops de erro
                    e.currentTarget.src = 'https://placehold.co/400x400/ccc/fff?text=Imagem+Indisponível'; // Imagem padrão
                  }}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ponto.nome}</h5>
                  <p className="card-text">{ponto.descricao.substring(0, 100)}...</p>
                  <div className="text-center mt-auto">
                    <Link 
                      href={`/ponto/${cidadeId}/${ponto.id}`} 
                      className="btn btn-primary"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted">Nenhum ponto turístico encontrado com esse nome.</p>
        </div>
      )}
    </div>
  );
}
