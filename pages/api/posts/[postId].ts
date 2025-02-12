import { NextApiRequest, NextApiResponse } from "next";
import { findPostById } from "@/app/api/actions/jsonHandler";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { postId } = req.query;

      if (!postId) {
        return res.status(400).json({ error: "PostId is required" });
      }

      // Buscar o post pelo ID usando a função do jsonHandler
      const post = findPostById(postId as string);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405);
  }
}
