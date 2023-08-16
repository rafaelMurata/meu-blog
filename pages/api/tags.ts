import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('GET /api/tags');
      const tags = await prisma.tag.findMany({
        select: {
          name: true,
        },
      });
      res.json({ tags: tags.map(tag => tag.name) });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve tags.' });
    }
  } 
}
