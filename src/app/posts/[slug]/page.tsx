'use client'
import {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import Container from '@/app/components/Container'
import DateFormatter from '@/app/components/blog/DateFormatter'
import ReactMarkdown from 'react-markdown'
import {Post} from '@/app/types'
import Head from "next/head";

const PostPage = () => {
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const summary = pathname?.split('/').pop()
                if (!summary) return

                const response = await fetch(`/api/posts?summary=${summary}`)
                const data = await response.json()

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
            <Head>
                <title>{post.title} | Blog do Rafael Murata</title>
                <meta name="description" content={post.summary || post.body.substring(0, 160)}/>

                <meta property="og:type" content="article"/>
                <meta property="og:title" content={post.title}/>
                <meta property="og:description" content={post.summary || post.body.substring(0, 160)}/>
                <meta property="og:image" content={post.imageUrl || '/images/default-og.jpg'}/>
                <meta property="og:url"
                      content={`https://www.rafaelmurata.dev/posts/${post.summary.substring(0, 160)}`}/>
            </Head>
            {post ? (
                <div className="flex justify-center items-start pt-20 pb-10">
                    <div className="max-w-4xl mx-auto p-6">
                        <h1 className="mb-4 text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800">
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

                        <div className="mb-4 flex justify-center items-center gap-1 text-gray-600">
                            <DateFormatter dateString={post.createdAt}/> - Rafael Murata
                        </div>

                        <div className="border rounded-md p-4 mb-4 bg-gray-50 prose prose-sm max-w-4xl text-lg mx-auto">
                            <ReactMarkdown
                                components={{
                                    code: ({node, className, children, ...props}) => (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }}
                            >
                                {post.body}
                            </ReactMarkdown>
                        </div>

                        {post.tags?.length > 0 && (
                            <div className="mb-6 flex justify-center items-center gap-2">
                                <span className="font-semibold text-gray-600">Tags:</span>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                                        >
                                      {tag}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center py-8">Carregando...</p>
            )}
        </Container>
    )
}

export default PostPage
