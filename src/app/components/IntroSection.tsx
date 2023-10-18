"use client"

import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const SectionWrapper = styled.div`
  background-image: url('/images/grid-18px-masked.png');
  background-repeat: repeat;
  padding: 3rem 0;
  text-align: center;
  color: #134471;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.8;
  display: flex; /* Adicione display flex para alinhar horizontalmente */
  align-items: center; /* Centralize verticalmente o texto e o ícone */
  justify-content: center; /* Centralize horizontalmente o texto e o ícone */
  flex-wrap: wrap; /* Se o conteúdo for muito longo, ele pode quebrar para a próxima linha */
`;

const GitHubLink = styled.a`
  display: inline-flex; /* Use inline-flex para colocar o ícone e o texto em linha */
  align-items: center; /* Centralize verticalmente o ícone e o texto */
  text-decoration: none;
  color: #134471;
  margin-left: 0.5rem; /* Adicione um espaço à esquerda entre o texto e o ícone */
`;

const IntroSection: React.FC = () => {
  return (
    <SectionWrapper>
      <Title>Bem vindo ao meu blog</Title>
      <Subtitle>
        Explorando ideias e compartilhando conhecimento. Meu blog foi criado em Next.js, MongoDB e Vercel.
      </Subtitle>
        <GitHubLink href="https://github.com/rafaelMurata/meu-blog" target="_blank" rel="noopener noreferrer">
          Github <FaGithub size={24} />
        </GitHubLink>
    </SectionWrapper>
  );
};

export default IntroSection;
