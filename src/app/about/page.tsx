import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: 'Sobre Rafael Murata | Especialista em JavaEE e Arquitetura de Software',
    description: 'Conheça Rafael Murata, especialista em integrações de software com 10 anos de experiência em Java, AWS e GCP.',
    keywords: 'JavaEE, AWS, GCP, Arquitetura de Software, Palestrante'
}

export default function About() {
    return (
        <article className="container mx-auto px-4 py-12">
            <header className="text-center mb-12">
                <div className="relative w-64 h-64 mx-auto">
                    <Image
                        src="/images/unnamed.jpg"
                        alt="Rafael Murata - Especialista em JavaEE"
                        fill
                        className="rounded-full object-cover"
                        sizes="(max-width: 640px) 100vw, 256px"
                        priority
                    />
                </div>
            </header>

            <section className="prose lg:prose-xl mx-auto">
                <h1 className="mb-4 flex justify-center items-center gap-1 ">Rafael Murata</h1>
                <p>
                    JavaEE Specialist & Software Architect
                    <br></br>
                    <br></br>
                    With a decade-long journey in software engineering, I have become an expert in seamless integrations. My skills are deeply rooted in Java with an expansive knowledge of both AWS and GCP infrastructure. From working on core transaction software to leading R&D teams, my experiences have always revolved around ensuring quality, scalability, and security in software solutions.
                    <br></br>
                    <br></br>
                    Having traveled the world from Italy to the Netherlands for various projects, I have been honored to contribute to many sectors including telecommunications and banking. My passion goes beyond code; I have been actively participating in international conferences and have a penchant for sharing knowledge, evident in the training I have created and the book I am writing.            <br></br>
                    <br></br>
                    Advanced in English and with basic proficiency in Spanish and French, I am always looking for new challenges. In an ever-evolving technological landscape, my adaptability and dedication have been my firm allies.            <br></br>
                    <br></br>
                </p>

                <div className="mt-8">
                    <ul className="flex flex-wrap gap-4 justify-center">
                        <li><Link href="mailto:rafael.murata@gmail.com" className="text-blue-600 hover:underline">E-mail</Link></li>
                        <li><Link href="https://linkedin.com/in/rafaelmurata" target="_blank" rel="noopener" className="text-blue-600 hover:underline">LinkedIn</Link></li>
                        <li><Link href="https://github.com/rafaelMurata" target="_blank" rel="noopener" className="text-blue-600 hover:underline">GitHub</Link></li>
                    </ul>
                </div>
            </section>
        </article>
    )
}
