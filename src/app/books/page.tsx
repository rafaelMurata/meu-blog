'use client'
 
import { useState } from 'react';
import Image from 'next/image';

export default function Book() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <Image
          className="block cursor-pointer"
          src="/images/book_swarm_intelligence.jpg"
          height={300}
          width={300}
          alt="Livro"
        />
        <label className="mt-4 text-center">
          Em breve o lançamento do livro - Introdução a Swarm Intelligence
        </label>
      </div>
    </div>
  );
}