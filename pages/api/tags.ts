import type { NextApiRequest, NextApiResponse } from 'next';
import { getTags } from "@/app/api/actions/jsonHandler";

interface Tag {
  id: string;
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('GET /api/tags');

      // Obter todas as tags do arquivo JSON
      const tags = getTags();

      // Retornar apenas os nomes das tags
      res.json({ tags: tags.map((tag: Tag) => tag.name) });
    } catch (error) {
      console.error("Error retrieving tags:", error);
      res.status(500).json({ error: 'Failed to retrieve tags.' });
    }
  } else {
    // Retornar erro para métodos não suportados
    res.setHeader('Allow', ['GET']);
  }
}
