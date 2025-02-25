// app/layout.tsx
import ClientOnly from './components/ClientOnly'
import GA from './components/GA'
import Navbar from './components/navbar/Navbar'
import ToasterProvider from './components/providers/ToasterProvider'
import './styles/globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Meu Blog',
    description: "Bem vindo ao meu blog"
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt">
        <GA GA_MEASUREMENT_ID='G-LRW56LCEFX' />
        <body className={inter.className}>
        <AuthProvider>
            <ClientOnly>
                <ToasterProvider />
                <Navbar />
            </ClientOnly>
            <div className="">
                {children}
            </div>
        </AuthProvider>
        </body>
        </html>
    )
}
