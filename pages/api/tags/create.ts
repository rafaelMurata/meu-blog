// /api/tags/create.js

import prisma from "@/app/libs/prismadb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    console.log('POST /api/tags');

    const bodyRequest = request.body; 
    const { name} = bodyRequest;

    if (!name) {
      return response.status(400).json({ error: 'O nome da tag é obrigatório.' });
    }

    try {
      // Crie uma nova tag usando Prisma
      const tag = await prisma.tag.create({
        data: {
          name: name,
        },
      });

      return response.status(201).json(tag);
    } catch (error) {
      // Este bloco capturará erros relacionados ao Prisma, como tentar criar uma tag com um nome que já existe (porque o nome da tag é único).
      console.error("Error creating tag:", error);
      return response.status(500).json({ error: "Erro ao criar tag. Por favor, tente novamente." });
    }
  } else {
    // Se não for uma requisição POST, retorne um erro.
    return response.status(405).json({ error: 'Método não permitido.' });
  }
}
