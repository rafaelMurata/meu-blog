'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const CreateTagPage: React.FC = () => {
    const router = useRouter();
    const [tagName, setTagName] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const fetchTags = async () => {
        try {
          const response = await fetch('/api/tags'); // Suponho que você tenha uma rota para buscar todas as tags
          const data = await response.json();
          setTags(data.tags);
        } catch (error) {
          console.error('Error fetching tags:', error);
        }
      };
    
      useEffect(() => {
        fetchTags();
      }, []);
      
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      try {
        const tagData = {
          name: tagName,
        };
  
        const response = await fetch('/api/tags/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tagData),
        });
  
        if (response.ok) {
          toast.success('Tag saved successfully');
          setTags([...tags, tagName]);
          setTagName(''); // Limpar o input após adicionar
        } else {
          throw new Error('Failed to save tag');
        }
      } catch (error) {
        console.error('Error creating tag:', error);
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-[90rem] bg-white p-6 shadow-md rounded-md mt-24 my-auto">
          <h1 className="text-2xl font-bold mb-4">Criar uma nova tag</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="tag" className="block text-gray-700 font-bold">Nome da Tag</label>
              <input
                type="text"
                id="tag"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Criar Tag
            </button>
          </form>
  
          {/* Lista de tags */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-3">Tags Criadas:</h2>
            <ul>
              {tags.map((tag, idx) => (
                <li key={idx} className="mb-2">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default CreateTagPage;
  