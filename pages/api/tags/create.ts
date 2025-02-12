import { NextApiRequest, NextApiResponse } from 'next';
import {getTags } from "@/app/api/actions/jsonHandler";
import fs from "fs";
import path from "path";

const TAGS_FILE_PATH = path.join(process.cwd(), 'data', 'tags.json');

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
      const tags = getTags();
      tags.push(name);
      const writeFile = (filePath: string, data: any) => {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      };
      writeFile(TAGS_FILE_PATH, tags);

      return response.status(201).json(name);
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
