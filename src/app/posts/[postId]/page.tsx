'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Container from '@/app/components/Container';
import axios from 'axios';  // Ensure you've imported axios
import DateFormatter from '@/app/components/blog/DateFormatter';
import ReactMarkdown from 'react-markdown';

interface Post {
  id: string;
  title: string;
  createdAt: string;
  slug: string;
  body: string;
  imageUrl?: string;
  tags: Tag[];
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
    }

    useEffect(() => {
      if (!postId) return;

      const fetchPost = async () => {
        try {
          const response = await axios.get<Post>(`/api/posts/${postId}`);
          setPost(response.data);
        } catch (error) {
          console.error("There was an error fetching the post:", error);
        }
      };

      fetchPost();
    }, [postId]);

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
              <div className="border rounded-md p-4 mb-4 bg-gray-50 prose prose-sm max-w-4xl text-lg mx-auto"> {/* Alterado max-w-none para max-w-4xl e adicionado mx-auto para centralizar */}
                  <ReactMarkdown children={post.body} />
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="mb-4">
                  <span className="font-bold text-gray-600">Tags:</span>
                  {post.tags && post.tags.map(tag => (
                    <span key={`tag-${tag.id}`} className="ml-2 bg-gray-200 rounded px-2 py-1 text-sm">
                      {tag.name}
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
