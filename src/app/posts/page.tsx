'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { SafeUser } from '../types';
import { getSession } from 'next-auth/react';

interface CreatePostProps {
  currentUser?: SafeUser | null;
}

const CreatePostPage: React.FC<CreatePostProps> = ({ currentUser}) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await getSession();
      setSession(currentSession);
      if (!currentSession) {
        router.push('/api/auth/signin');
      }
    };
    
    fetchSession();
  }, [router]);
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [slug, setSlug] = useState('');
  const [imageUrl, setImageUrl] = useState('');
 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const session = await getSession();
      //console.log("Session:", session?.user?.email?.toString());
      //console.log(currentUser  + 'user');
      const postData = {
        title,
        body,
        slug,
        imageUrl,
        userEmail: session?.user?.email?.toString(),
      };

      // Send a POST request to your API route
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toast.success('Post saved successfully');
        router.refresh(); // Or navigate to a different page
      } else {
        throw new Error('Failed to save post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-[90rem] bg-white p-6 shadow-md rounded-md mt-24 my-auto">
        <h1 className="text-2xl font-bold mb-4">Criar um novo post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="slug" className="block text-gray-700 font-bold">Resumo</label>
            <textarea
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border rounded-md px-4 py-2 w-full h-20"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-bold">Imagem URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700 font-bold">Corpo do Post</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border rounded-md px-4 py-2 w-full h-40"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Criar Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;