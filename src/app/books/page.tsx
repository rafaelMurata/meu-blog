
import Image from 'next/image';
export const metadata = {
    title: 'Sobre Rafael Murata | Especialista em JavaEE e Arquitetura de Software',
    description: 'Conheça Rafael Murata, especialista em integrações de software com 10 anos de experiência em Java, AWS e GCP.',
    keywords: 'JavaEE, AWS, GCP, Arquitetura de Software, Palestrante'
}
export default function Book() {
  return (
      <article className="container mx-auto px-4 py-12">

    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <Image
          className="block cursor-pointer"
          src="/images/book_swarm_intelligence.jpg"
          height={300}
          width={300}
          alt="Livro"
        />
        <label className="mt-4 text-center">
          Em breve o lançamento do livro - Introdução a Swarm Intelligence
        </label>
      </div>
    </div>
      </article>
  );
}