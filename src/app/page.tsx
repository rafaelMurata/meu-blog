import Link from "next/link";
import Container from "./components/Container";
import PostHero from "./components/blog/PostHero";
import PostPreview from "./components/blog/PostPreview";
import IntroSection from "./components/IntroSection";
import { getPosts } from "@/app/api/actions/jsonHandler";

interface Post {
  id: string;
  title: string;
  body: string;
  slug: string;
  imageUrl?: string;
  createdAt: string;
  tags: string[];
}

const Home = async () => {
  try {
    // Especificamos o tipo de retorno da função getPosts
    const recentPosts: Post[] = await getPosts();

    return (
        <Container>
          <div className="flex justify-center min-h-screen">
            <div className="pt-20">
              <IntroSection />
              <PostHero />
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Posts recentes</h2>
                {recentPosts && recentPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recentPosts.map((post: Post) => {
                        console.log(post);
                        return (
                            <div key={post.id}>
                              <PostPreview post={post} />
                            </div>
                        );
                      })}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No recent posts found.</p>
                )}
              </div>
            </div>
          </div>
        </Container>
    );
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return null;
  }
};

export default Home;
