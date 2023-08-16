'use client';

import React, { SetStateAction, useEffect, useState } from 'react'
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signIn , signOut } from 'next-auth/react';
import { toast } from "react-hot-toast";
import { SafeUser } from '@/app/types';
import Button from '@/app/components/Button';
import Heading from '@/app/components/Heading';

interface SignInResponse {
    ok: boolean;
    error?: string | null;
    user?: SafeUser;
}

  
export default function MyProfile() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [callback, setCallback] = useState<SetStateAction<boolean>>(false);

  const [user, setUser] = useState<SafeUser | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    // Valida os dados do formulário
    if (email === "" || password === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    signIn('credentials', {
        email: email, 
        password: password, 
        redirect: false, 
      }).then((callback: SignInResponse | undefined) => {
        if (callback) {
          if(callback.ok){
              setCallback(callback.ok);
              toast.success('Logged in');
              router.refresh();
          }
          if (callback.error) {
            toast.error(callback.error);
          }
        } else {
          // Lidar com o caso em que callback é undefined se necessário
        }
      });
    }

  const handleLogout = () => {
    signOut(); 
    router.refresh();
    // Logout the user
   //Auth.signOut();
    // Clear the user from sessionStorage
   // sessionStorage.removeItem("user");
    // Set the user to null
   // setUser(null);
    // Update the navbar
   // router.push('/profiles');
  };
 
  if (callback) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md bg-white p-6 shadow-md rounded-md">
        <h1 className="text-center mb-4">Bem-vindo!</h1>
        <Button
        outline
        label="Criar post"
        icon={AiOutlineLogin}
        onClick={() => router.push('/posts')}
        type="submit"
        />
        <Button
        outline
        label="Criar tag"
        icon={AiOutlineLogin}
        onClick={() => router.push('/tags')}
        type="submit"
        />
        <Button
            outline
            label="Logout"
            icon={AiOutlineLogout}
            type="button"
            onClick={handleLogout}
          />
        </div>
      </div>
    );
    } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md bg-white p-6 shadow-md rounded-md">
        <Heading
        title="Welcome back"
        subtitle="Login to your account!"
        />
          <form onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-b border-gray-300 rounded-md" />
            <input type="password" name="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-b border-gray-300 rounded-md" />
            <Button
            outline
            label="Login"
            icon={AiOutlineLogin}
            type="submit"
            onClick={() => {}}
            />
          </form>
        </div>
      </div>
    );
  }
}