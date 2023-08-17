import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/libs/prismadb";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const bodyRequest = request.body; 
      const { title, body, slug, imageUrl, userEmail, tags } = bodyRequest;

      const currentUser = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      });

      if (!currentUser) {
        return response.status(400).json({ error: "User not found" });
      }

      const post = await prisma.post.create({
        data: {
          title,
          body,
          slug,
          imageUrl,
          author: {
            connect: {
              id: currentUser.id,
            },
          }
        }
      });

      for (let tagName of tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName }
        });

        await prisma.postTag.create({
          data: {
            postId: post.id,
            tagId: tag.id
          }
        });
      }

      return response.status(201).json(post);

    } catch (error) {
      console.error("Error creating post:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  } else {
    return response.status(405).end();
  }
}

