import Image from "next/image";
import Link from "next/link";
import DateFormatter from "./DateFormatter";
interface Post {
  id: string;
  title: string;
  createdAt: string;
  slug: string;
}

export default function PostPreview({ post }: { post: Post }) {
  return (
    <div className="w-full mx-auto group">
      <Link href={`/posts/${post.id}`}>
        <div className="mt-4 space-y-2">
          <p className="font-semibold text-xl group-hover:underline">
            {post.title}
          </p>
          <DateFormatter dateString={post.createdAt.toString() || ''} />
          <p>{post.slug}</p>
        </div>
      </Link>
    </div>
  );
}