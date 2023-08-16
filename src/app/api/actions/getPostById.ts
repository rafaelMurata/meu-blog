import prisma from "@/app/libs/prismadb";

export default async function getPostById(postId: string) {
  try {
   // console.log('Fetching post with id: ', postId);
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return null;
    }

    // Converta as datas para strings
    const safePost = {
      ...post,
      createdAt: post.createdAt.toISOString()
    };

    return safePost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}