import { NextApiRequest, NextApiResponse } from "next";
import { addPost, addTag, findUserByEmail, generateId, getTags } from "@/app/api/actions/jsonHandler";

interface Tag {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
  slug: string;
  imageUrl: string;
  authorId: string;
  createdAt: string;
  tags: string[];
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      const bodyRequest = request.body;
      const { title, body, slug, imageUrl, userEmail, tags } = bodyRequest;

      const currentUser = findUserByEmail(userEmail);

      if (!currentUser) {
        return response.status(400).json({ error: "User not found" });
      }

      const newPost: Post = {
        id: generateId(),
        title,
        body,
        slug,
        imageUrl,
        authorId: currentUser.id,
        createdAt: new Date().toISOString(),
        tags: []
      };

      for (let tagName of tags) {
        let tag = findTagByName(tagName);
        if (!tag) {
          tag = {
            id: generateId(),
            name: tagName
          };
          addTag(tag);
        }
        newPost.tags.push(tag.id);
      }

      addPost(newPost);

      return response.status(201).json(newPost);

    } catch (error) {
      console.error("Error creating post:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  } else {
    return response.status(405).end();
  }
}

// Função auxiliar para encontrar uma tag pelo nome
function findTagByName(name: string): Tag | undefined {
  const tags = getTags();

  // Adicionando o tipo explicitamente para o parâmetro 'tag'
  return tags.find((tag: Tag) => tag.name === name);
}
