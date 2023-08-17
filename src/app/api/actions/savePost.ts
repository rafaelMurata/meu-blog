import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

interface PostData {
  title: string;
  body: string;
  slug: string;
  imageUrl: string;
}

export default async function savePost(request: NextApiRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const postData: PostData = request.body as PostData;

    if (!postData.title || !postData.body || !postData.slug || !postData.imageUrl) {
        return null;
    }

    const post = await prisma.post.create({
      data: {
        title: postData.title,
        body: postData.body,
        slug: postData.slug,
        imageUrl: postData.imageUrl,
        author: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}
