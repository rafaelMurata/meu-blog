import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Sobre Rafael Murata | Especialista em JavaEE e Arquitetura de Software',
  description:
    'Conheça Rafael Murata, especialista em integrações de software com mais de 10 anos de experiência em Java, AWS e GCP.',
  keywords: 'JavaEE, AWS, GCP, Arquitetura de Software, Freelancer, Backend'
};

const achievements = [
  'Projeto e treinamento em Verona (Itália) para ferramenta de correlação de sinais no contexto Itaú.',
  'Integração de Smartbox em Eindhoven (Holanda) para o portfólio da BCF.',
  'Apresentação de projeto na 12ª International Security Conference (ISBC 2017).',
  'Desenvolvimento do Graph Optimizer utilizando algoritmos de Swarm Intelligence.',
  'Liderança de projeto de monitoramento na Praça Vilaboim (Prefeitura de São Paulo).',
  'Atuação em middleware de nova geração para TIM Brasil na Engineering do Brasil.'
];

const recentExperience = [
  {
    role: 'Software Engineer at Google (via CI&T)',
    period: 'fev 2024 — dez 2024',
    summary:
      'Migração de APIs do Security Command Center (V1 para V2) e criação de code samples em Java, Node.js, Python, Go e Ruby para boas práticas de integração.',
    tech: 'GCP, Java, Node.js, Python, Go, Ruby'
  },
  {
    role: 'Software Engineer at Driveway (via CI&T)',
    period: '2024',
    summary:
      'Atuação no time de enhancement backend, propondo soluções transversais, correção de bugs críticos e melhoria contínua para múltiplas squads.',
    tech: 'Kotlin, MongoDB, MySQL, Gradle, Auth0, Datadog'
  },
  {
    role: 'Java Specialist/Architecture — ESX',
    period: 'mar 2023 — out 2023',
    summary:
      'Evolução de sistemas JavaEE para o Pede Pronto em GCP, decisões de arquitetura, banco relacional e não relacional e documentação técnica.',
    tech: 'GCP, Docker, MongoDB, Java, Spring, Kubernetes'
  },
  {
    role: 'Java Specialist — Co.Aktion',
    period: 'ago 2022 — mar 2023',
    summary:
      'Modernização de chatbot monolítico para serviços escaláveis e seguros, além da construção de nova versão com NodeJS e AWS.',
    tech: 'AWS, Java, Spring, Hibernate, Node.js, Next.js, NestJS, GraphQL, Docker'
  }
];

const servicePillars = [
  'Arquitetura backend para produtos em crescimento',
  'Migração de monolitos para microsserviços',
  'Integração e design de APIs (REST/SOAP/eventos)',
  'Cloud strategy com AWS e GCP',
  'Observabilidade, segurança e confiabilidade',
  'Mentoria técnica e aceleração de times'
];

export default function About() {
  return (
    <article className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12 md:px-8 md:pt-16">
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 text-white shadow-xl md:p-12">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-blue-500/30 blur-3xl" />

        <div className="relative z-10 grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
          <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-2xl border border-white/20 shadow-lg shadow-black/30 md:h-52 md:w-52">
            <Image
              src="/images/unnamed.jpg"
              alt="Rafael Murata"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 176px, 208px"
              priority
            />
          </div>

          <div>
            <p className="inline-flex rounded-full border border-cyan-200/40 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              JavaEE Specialist / Software Architect
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">Rafael Murata</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
              Há mais de uma década eu entrego soluções de software com foco em escalabilidade, segurança e integração
              entre sistemas. Nos últimos 2 anos atuei com forte sucesso como freelancer, liderando modernizações,
              evolução de arquitetura e aceleração de times de engenharia.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="mailto:rafael.murata@gmail.com"
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
              >
                Contratar para projeto
              </Link>
              <Link
                href="https://linkedin.com/in/rafaelmurata"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-200 hover:text-cyan-200"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/rafaelMurata"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-200 hover:text-cyan-200"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">Destaques de carreira</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
            {achievements.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Serviços</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">Como posso ajudar</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {servicePillars.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Últimos anos (freelancer + projetos estratégicos)</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">Experiência recente</h2>

        <div className="mt-6 space-y-4">
          {recentExperience.map((job) => (
            <div key={job.role} className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-bold text-slate-900">{job.role}</h3>
                <p className="text-sm font-semibold text-blue-700">{job.period}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{job.summary}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{job.tech}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
