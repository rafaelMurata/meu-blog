'use client'
 
import { useState } from 'react';
import Image from 'next/image';

export default function About() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              className="block cursor-pointer pt-20"
              src="/images/unnamed.jpg"
              height={300}
              width={300}
              alt="Livro"
            />
          </div>
        <label className="mt-4 text-justify max-w-[40%]">
            <br></br>
            Rafael trabalhou nos últimos 10 anos como Engenheiro de Software especializado em integrações. É proficiente em Java e AWS/GCP como infraestrutura. Apaixonado por entregar software com qualidade, escalabilidade e segurança. 
            <br></br>
            <br></br>
            Com mais de uma década de experiência no campo da engenharia de software, Rafael é um membro ativo da comunidade Java BR e atua como consultor. Ele se dedica incansavelmente a fornecer soluções de valor aos seus clientes, ao mesmo tempo em que impulsiona a transformação digital e promover a inovação.
          </label>
        </div>
      </div>
    );
  }