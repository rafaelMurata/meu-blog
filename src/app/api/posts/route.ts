// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import {addPost, findPostById, findPostBySummary} from "@/app/api/actions/jsonHandler.server"
import {generateExcerpt, generateUniqueSummary} from "@/app/lib/slugGenerator";

export async function POST(request: Request) {
    try {
        const body = await request.json()

        if (!body.authorId) {
            return NextResponse.json(
                { error: 'Usuário não autenticado' },
                { status: 401 }
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
    const { searchParams } = new URL(request.url);
    const summary = searchParams.get('summary');

    if (!summary) {
        return NextResponse.json(
            { error: 'Slug parameter is required' },
            { status: 400 }
        );
    }

    try {
        const post = findPostBySummary(summary);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // Retorna apenas os campos necessários para SEO
        const seoData = {
            title: post.title,
            summary: post.summary || generateExcerpt(post.body), // Fallback se não tiver summary
            imageUrl: post.imageUrl,
            body: post.body,
            tags: post.tags,
            createdAt: post.createdAt
        };

        return NextResponse.json(seoData);

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
