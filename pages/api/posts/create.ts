import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/api/actions/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const bodyRequest = request.body; // Parse JSON directly from request body
      const { title, body, slug, imageUrl ,userEmail} = bodyRequest;

      const currentUser = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      });
     // console.log(currentUser + 'sssss');

      const post = await prisma.post.create({
        data: {
          title,
          body,
          slug,
          imageUrl,
          author: {
            connect: {
              id: currentUser?.id, // Assuming currentUser contains the author's id
            },
          },
        },
      });
      

      return response.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  } else {
    return response.status(405).end();
  }
}
