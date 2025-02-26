import Image from "next/image";
import Link from "next/link";
import {generateSlug} from "@/app/lib/slugGenerator";
interface Post {
  id: string;
  title: string;
  createdAt: string;
  summary: string;
}

export default function PostPreview({ post }: { post: Post }) {
  return (
    <div className="w-full mx-auto group">
      <Link href={`/posts/${generateSlug(post.summary)}`}>
        <div className="mt-4 space-y-2">
          <p className="font-semibold text-xl group-hover:underline">
            {post.title}
          </p>
          <p>{post.summary}</p>
        </div>
      </Link>
    </div>
  );
}