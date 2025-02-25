// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { addPost, getUsers, findPostById } from "@/app/api/actions/jsonHandler.server"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        if (!body.authorId) {
            return NextResponse.json(
                { error: 'Usuário não autenticado' },
                { status: 401 }
            )
        }

        const user = getUsers().find(user => user.id === body.authorId)
        if (!user) {
            return NextResponse.json(
                { error: 'Usuário não encontrado' },
                { status: 404 }
            )
        }

        const newPost = {
            ...body,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        }

        addPost(newPost)

        return NextResponse.json(newPost, { status: 201 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Erro interno no servidor' },
            { status: 500 }
        )
    }
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const postId = url.searchParams.get('id')

        if (!postId) {
            return NextResponse.json(
                { error: 'ID do post é obrigatório' },
                { status: 400 }
            )
        }

        const post = findPostById(postId)

        if (!post) {
            return NextResponse.json(
                { error: 'Post não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(post)

    } catch (error) {
        return NextResponse.json(
            { error: 'Erro interno no servidor' },
            { status: 500 }
        )
    }
}
