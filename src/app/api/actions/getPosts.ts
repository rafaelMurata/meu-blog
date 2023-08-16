import prisma from "@/app/libs/prismadb";

export default async function getPosts() {
  try {
    const posts = await prisma.post.findMany();

    if (!posts) {
      return null;
    }

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toString(),
    }));
   
    return safePosts;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}