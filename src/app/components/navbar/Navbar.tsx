'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import MenuItem from './MenuItem'
import Logo from "@/app/components/navbar/Logo"
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md" role="navigation">
            <div className="flex items-center">
                <Link href="/" aria-label="Home">
                    <Logo />
                </Link>
                <h1 className="ml-2 font-bold text-xl">
                    <Link href="/" className="text-gray-800 hover:text-gray-600">
                        Rafael Murata
                    </Link>
                </h1>
            </div>

            <div className="flex gap-4">
                {status === 'unauthenticated' && (
                    <>
                        <MenuItem label="Livro" onClick={() => router.push('/books')} />
                        <MenuItem label="Sobre" onClick={() => router.push('/about')} />
                        <MenuItem label="Login" onClick={() => router.push('/login')} />
                    </>
                )}

                {status === 'authenticated' && (
                    <>
                        <MenuItem label="Novo Post" onClick={() => router.push('/posts/new')}/>
                        <MenuItem label="Logout" onClick={() => signOut()} />
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
