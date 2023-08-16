import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/libs/prismadb";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    try {
      const { postId } = request.query;
      //console.log(postId+'eeeeeeee');
      // Validate that postId is a valid ObjectId or your desired format
      // Assuming postId is a string, you can add more validation if needed

      // Fetch the post using Prisma
      const post = await prisma.post.findUnique({
        where: {
          id: postId as string,
        },
      });

      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      return response.status(200).json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  } else {
    return response.status(405).end();
  }
}
