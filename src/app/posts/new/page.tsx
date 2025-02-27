'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewPostPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        body: '',
        imageUrl: '',
        tags: [] as string[]
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user) {
            console.error('ID do usuário não encontrado na sessão');
            return;
        }

        const newPost = {
            ...formData,
            authorId: session.user.name,
            createdAt: new Date().toISOString()
        };

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })

        if (response.ok) {
            router.push('/')
        }
    }

    if (!session) {
        return <div className="text-center py-8">Faça login para criar posts</div>
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-4xl mx-auto space-y-6">
            <div className="space-y-2">
                <label className="block text-lg font-medium">Título</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="block text-lg font-medium">Summary</label>
                <input
                    type="text"
                    value={formData.summary}
                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="block text-lg font-medium">Conteúdo (Markdown)</label>
                <textarea
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                    className="w-full h-96 p-2 border rounded font-mono"
                    placeholder="Escreva seu post em Markdown..."
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="block text-lg font-medium">URL da Imagem</label>
                <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-lg font-medium">Tags (separadas por vírgula)</label>
                <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({
                        ...formData,
                        tags: e.target.value.split(',').map(tag => tag.trim())
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="Ex: Java, Programação, OOP"
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Publicar Post
            </button>
        </form>
    )
}
