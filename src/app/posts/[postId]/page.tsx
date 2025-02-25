'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Container from '@/app/components/Container'
import DateFormatter from '@/app/components/blog/DateFormatter'
import ReactMarkdown from 'react-markdown'
import { Post } from '@/app/types'

const PostPage = () => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postId = pathname?.split('/').pop()
        if (!postId) return

        const response = await fetch(`/api/posts?id=${postId}`)
        const data = await response.json()

        // Corrige formatação do Markdown
        const formattedPost = {
          ...data,
          body: data.body
              .replace(/\\n/g, '\n')
              .replace(/\\\"/g, '"')
        }

        setPost(formattedPost)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [pathname])

  if (loading) {
    return (
        <Container>
          <div className="text-center py-8">Carregando...</div>
        </Container>
    )
  }

  if (!post) {
    return (
        <Container>
          <div className="text-center py-8">Post não encontrado</div>
        </Container>
    )
  }

  return (
      <Container>
        <div className="flex justify-center items-start pt-20 pb-10">
          <div className="max-w-3xl mx-auto p-6 w-full">
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {post.title}
            </h1>

            {post.imageUrl && (
                <div className="mb-4 flex justify-center">
                  <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="max-w-full h-auto rounded-md shadow-lg"
                  />
                </div>
            )}

            <div className="mb-4 text-lg text-gray-600">
              <DateFormatter dateString={post.createdAt} /> - Rafael Murata
            </div>

            <div className="border rounded-md p-4 mb-4 bg-gray-50 prose max-w-4xl mx-auto">
              <ReactMarkdown
                  components={{
                    code: ({ node, inline, className, children, ...props }) => (
                        <code className={className} {...props}>
                          {children}
                        </code>
                    )
                  }}
              >
                {post.body}
              </ReactMarkdown>
            </div>

            {post.tags && post.tags.length > 0 && (
                <div className="mb-4">
                  <span className="font-bold text-gray-600">Tags:</span>
                  {post.tags.map((tag: string) => (
                      <span
                          key={tag}
                          className="ml-2 bg-gray-200 rounded px-2 py-1 text-sm"
                      >
                  {tag}
                </span>
                  ))}
                </div>
            )}
          </div>
        </div>
      </Container>
  )
}

export default PostPage
