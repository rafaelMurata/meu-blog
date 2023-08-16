'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Container from '@/app/components/Container';
import axios from 'axios';  // Ensure you've imported axios
import DateFormatter from '@/app/components/blog/DateFormatter';

interface Post {
  id: string;
  title: string;
  createdAt: string;
  slug: string;
  body: string;
  tags: Tag[]; // Add tags here
}

interface Tag {
  id: string;
  name: string;
}

const PostIdPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);

    const pathname = usePathname();
    let postId: string | null = null;

    if (pathname) {
      const parts = pathname.split('/');
      postId = parts[2];
    } else {
      console.error("Pathname is null!");
      // Handle this error as needed
    }

    useEffect(() => {
      if (!postId) return;

      const fetchPost = async () => {
        try {
          const response = await axios.get<Post>(`/api/posts/${postId}`);
          setPost(response.data);
        } catch (error) {
          console.error("There was an error fetching the post:", error);
          // You might want to handle this error more gracefully in a real-world scenario
        }
      };

      fetchPost();
    }, [postId]);

  return (
    <Container>
      {post ? (
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-3xl mx-auto p-6">
            <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-800">
              {post.title}
            </h1>
            <h3 className="mt-6 text-lg md:text-xl text-gray-600">{post.slug}</h3>
            <div className="mt-6 prose max-w-none">
              <p className="text-justify">{post.body}</p>
            </div>
            <div className="mt-4">
              {post.tags && post.tags.length > 0 && (
                <div>
                  <span className="font-bold text-gray-600">Tags:</span>
                  {post.tags && post.tags.map(tag => (
                  <span key={`tag-${tag.id}`} className="ml-2 bg-gray-200 rounded px-2 py-1 text-sm">
                    {tag.name}
                  </span>
                ))}
                </div>
              )}
            </div>
            <p className="mt-6 mt-2 text-sm text-gray-500">
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
