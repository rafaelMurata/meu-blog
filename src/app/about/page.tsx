'use strict'
 
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
              alt="About me"
            />
          </div>
        <label className="mt-4 text-justify max-w-[40%]">
            <br></br>
            Rafael Murata
            <br></br>
            JavaEE Specialist & Software Architect
            <br></br>
            <br></br>
            With a decade-long journey in software engineering, I have become an expert in seamless integrations. My skills are deeply rooted in Java with an expansive knowledge of both AWS and GCP infrastructure. From working on core transaction software to leading R&D teams, my experiences have always revolved around ensuring quality, scalability, and security in software solutions.
            <br></br>
            <br></br>
            Having traveled the world, from Italy to the Netherlands, for various projects, I have had the honor of contributing to diverse sectors, including telecom and banking. My passion extends beyond just code; I've been an active participant in international conferences and have a penchant for sharing knowledge, evident from the training I've created and the textbooks I've penned.
            <br></br>
            <br></br>
            Fluent in English and with basic proficiency in both Spanish and French, I am always on the lookout for new challenges. In an ever-evolving tech landscape, my adaptability and dedication have been my steadfast allies.
            <br></br>
            <br></br>
            Connect with me via <strong><a href="mailto:rafael.murata@gmail.com" target="_blank" rel="noopener noreferrer">Email</a></strong>, 
            <strong><a href="https://github.com/rafaelMurata" target="_blank" rel="noopener noreferrer"> GitHub</a></strong>, 
            <strong><a href="https://www.linkedin.com/in/rafaelmurata" target="_blank" rel="noopener noreferrer"> LinkedIn</a></strong>, or read my thoughts on 
            <strong><a href="https://medium.com/@rafael-murata" target="_blank" rel="noopener noreferrer"> Medium</a></strong>. Together, let's create, innovate, and elevate technology to new heights.
            <br></br>
            <br></br>
          </label>
        </div>
      </div>
    );
  }