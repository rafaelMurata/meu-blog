import { DefaultSeo } from 'next-seo'
import { Inter } from 'next/font/google'
import ClientOnly from '@/app/components/ClientOnly'
import GA from '@/app/components/GA'
import Navbar from '@/app/components/navbar/Navbar'
import ToasterProvider from '@/app/components/providers/ToasterProvider'
import AuthProvider from '@/app/providers'
import './styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
        <head>
            <title>Blog do Rafael Murata</title>
            <meta name="description" content="Explorando ideias e compartilhando conhecimento."/>
            <meta name="google-adsense-account" content="ca-pub-8099369477459294"/>
            <GA GA_MEASUREMENT_ID='G-LRW56LCEFX'/>
        </head>

        <body className={inter.className}>
        <AuthProvider>
        <ClientOnly>
                <ToasterProvider />
                <Navbar />
            </ClientOnly>

            <main className="min-h-screen">
                {children}
            </main>
        </AuthProvider>
        </body>
        </html>
    )
}
