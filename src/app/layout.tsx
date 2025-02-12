import ClientOnly from './components/ClientOnly'
import GA from './components/GA'
import Navbar from './components/navbar/Navbar'
import ToasterProvider from './components/providers/ToasterProvider'
import './styles/globals.css'
import { Inter } from 'next/font/google'
import {getUsers} from "@/app/api/actions/jsonHandler";

const inter = Inter({ subsets: ['latin'] })

export const metadata= {
  title:'Meu Blog',
  description:"Bem vindo ao meu blog"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getUsers();
  return (
    <html lang="pt">
    <GA GA_MEASUREMENT_ID='G-LRW56LCEFX' />
    <body className='{font.className}'>
      <ClientOnly>
        <ToasterProvider />
        <Navbar currentUser={currentUser}/>
      </ClientOnly>
      <div className="">
        {children}
      </div>
    </body>
  </html>
  )
}
