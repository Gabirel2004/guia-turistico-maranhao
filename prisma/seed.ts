// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { cidades } from '../data/Cidades';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando seed...');

  for (const cidade of cidades) {
    const novaCidade = await prisma.cidade.create({
      data: {
        nome: cidade.nome,
        tipo: cidade.tipo,
        imagem: cidade.imagem,
        descricao: cidade.descricao,
        localizacao: cidade.localizacao,
        melhor_epoca: cidade.melhor_epoca,
        pontos_turisticos: {
          create: cidade.pontos_turisticos.map((ponto) => ({
            nome: ponto.nome,
            descricao: ponto.descricao,
            imagem: ponto.imagem,
            localizacao: ponto.localizacao
          }))
        }
      }
    });

    console.log(`🏙️ ${novaCidade.nome} adicionada com sucesso!`);
  }

  console.log('🎉 Seed finalizado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
