import Container from './components/Container';
import PostPreview from './components/blog/PostPreview';
import IntroSection from './components/IntroSection';
import { getPosts } from '@/app/api/actions/jsonHandler.server';

interface Post {
  id: string;
  title: string;
  body: string;
  summary: string;
  imageUrl?: string;
  createdAt: string;
  tags: string[];
}

const Home = async () => {
  try {
    const recentPosts: Post[] = await getPosts();

    return (
      <Container>
        <main className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-16 pt-12 md:px-8 md:pt-16">
          <IntroSection />

          <section className="mt-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">Conteúdo técnico</p>
                <h2 className="mt-2 text-3xl font-black text-slate-900">Posts recentes</h2>
              </div>
            </div>

            {recentPosts && recentPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {recentPosts.map((post: Post) => {
                  return (
                    <div key={post.id} className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                      <PostPreview post={post} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                Ainda não há posts recentes publicados.
              </p>
            )}
          </section>
        </main>
      </Container>
    );
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return null;
  }
};

export default Home;
