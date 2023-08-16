'use client';
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from 'next-auth/react';
import Container from "../Container";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  const router = useRouter()
  const fetchData = async () => {
    try {
      // Fetch data if needed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <Container>
        <div className="flex flex-row items-center justify-between py-4 border-b-[1px] gap-3 md:gap-0">
          <div className="flex items-center">
            <Logo />
            <label className="ml-2 font-bold text-xl">Rafael Murata</label>
          </div>
          <div className="hidden md:flex gap-6">
            <MenuItem label="Livro" onClick={() => router.push('/books')} />
            <MenuItem label="Sobre" onClick={() => router.push('/about')} />
            {!currentUser && (
              <MenuItem label="Login" onClick={() => router.push('/profiles')} />
            )}
            {currentUser && (
              <>
                <MenuItem label="Create Post" onClick={() => router.push('/posts')} />
                <MenuItem label="Logout" onClick={ ()=> signOut() } />
              </>
            )}
          </div>
          <div className="md:hidden flex gap-3">
            <button className="text-gray-500 hover:text-gray-800 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;