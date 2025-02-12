'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Container from '@/app/components/Container';
import DateFormatter from '@/app/components/blog/DateFormatter';
import ReactMarkdown from 'react-markdown';

interface Post {
  id: string;
  title: string;
  createdAt: string;
  slug: string;
  body: string;
  imageUrl?: string;
  tags: string[];
}

const PostIdPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchPost = async () => {
      if (!pathname) {
        console.error("Pathname is null!");
        return;
      }

      const parts = pathname.split('/');
      const postId = parts[2];

      if (!postId) {
        console.error("PostId is null!");
        return;
      }

      try {
        // Use a chamada à API para buscar o post
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("There was an error fetching the post:", error);
      }
    };

    fetchPost();
  }, [pathname]);

  return (
      <Container>
        {post ? (
            <div className="flex justify-center items-start pt-20 pb-10">
              <div className="max-w-3xl mx-auto p-6">
                <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                  {post.title}
                </h1>
                {post.imageUrl && (
                    <div className="mb-4 flex justify-center">
                      <img src={post.imageUrl} alt={post.title} className="max-w-full h-auto rounded-md shadow-lg" />
                    </div>
                )}
                <h3 className="mb-4 text-lg md:text-xl text-gray-600">{post.slug}</h3>
                <div className="border rounded-md p-4 mb-4 bg-gray-50 prose prose-sm max-w-4xl text-lg mx-auto">
                  <ReactMarkdown children={post.body} />
                </div>
                {post.tags && post.tags.length > 0 && (
                    <div className="mb-4">
                      <span className="font-bold text-gray-600">Tags:</span>
                      {post.tags.map(tag => (
                          <span key={`tag-${tag}`} className="ml-2 bg-gray-200 rounded px-2 py-1 text-sm">
                                        {tag}
                                    </span>
                      ))}
                    </div>
                )}
                <p className="text-sm text-gray-500">
                  <DateFormatter dateString={post.createdAt} /> - Rafael Murata
                </p>
              </div>
            </div>
        ) : (
            <p>Loading...</p>
        )}
      </Container>
  );
};

export default PostIdPage;
