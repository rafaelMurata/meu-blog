import getCurrentUser from './api/actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import Navbar from './components/navbar/Navbar'
import ToasterProvider from './components/providers/ToasterProvider'
import PostIdPage from './posts/[postId]/page'
import './styles/globals.css'
import { Inter } from 'next/font/google'

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
  const currentUser = await getCurrentUser();
 // console.log(currentUser + 'user');
  return (
    <html lang="pt">
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
