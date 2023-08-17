'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DateFormatter from "./DateFormatter";

interface Post {
  title: string;
  imageUrl: string;
  createdAt: string;
  slug: string;
}

export default function PostHero() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Utilizando .then() para obter os dados da função assíncrona
   // getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-2 grid-cols-1">
      {posts.map((post: Post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
          <div className="w-full mx-auto group">
            <Image
              alt={`cover image for ${post.title}`}
              src={post.imageUrl}
              width={400}
              height={400}
              style={{ width: "100%" }}
            />

            <div className="grid mt-4 md:grid-cols-2 grid-cols-1">
              <div className="mb-2">
                <p className="font-semibold text-xl group-hover:underline">
                  {post.title}
                </p>
                <DateFormatter dateString={post.createdAt} />
              </div>
              <p>{post.slug}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}