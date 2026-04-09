import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const highlights = [
  '10+ anos em arquitetura e engenharia de software',
  '2 anos recentes com atuação freelancer de alto impacto',
  'Experiência prática em Java, AWS, GCP e sistemas distribuídos',
  'Contribuições open-source com PRs aprovados no ecossistema Google'
];

const IntroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/70 backdrop-blur md:p-12">
      <div className="absolute -right-28 -top-28 h-60 w-60 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute -left-28 bottom-0 h-60 w-60 rounded-full bg-cyan-100 blur-3xl" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-end">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            Portfólio Freelancer & Arquitetura Java
          </p>

          <h1 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">
            Eu projeto e evoluo plataformas robustas para escalar produtos digitais.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Sou Rafael Murata, especialista em JavaEE e arquitetura de software. Esta vitrine foi modernizada para
            mostrar minha trajetória, projetos relevantes e a forma como entrego valor como freelancer para negócios
            que precisam de performance, segurança e confiabilidade.
          </p>

          <ul className="mt-8 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-2xl shadow-slate-300/60">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Disponível para projetos</p>
          <p className="mt-3 text-2xl font-bold">Freelancer backend & arquitetura</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Atuação hands-on em migração de APIs, modernização de monolitos, observabilidade e desenho de sistemas em
            nuvem.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
            >
              Ver trajetória
            </Link>
            <Link
              href="mailto:rafael.murata@gmail.com"
              className="rounded-lg border border-slate-500 px-4 py-2 text-sm font-semibold transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Falar sobre projeto
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-4 text-slate-300">
            <Link href="https://linkedin.com/in/rafaelmurata" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
              <FaLinkedin size={20} />
            </Link>
            <Link href="https://github.com/rafaelMurata" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
              <FaGithub size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
