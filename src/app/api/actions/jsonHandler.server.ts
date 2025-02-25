import fs from 'fs';
import path from 'path';
import { Post } from '@/app/types';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const POSTS_FILE_PATH = path.join(DATA_DIR, 'posts.json');
const USERS_FILE_PATH = path.join(DATA_DIR, 'users.json');
const TAGS_FILE_PATH = path.join(DATA_DIR, 'tags.json');

// Garante que o diretório e arquivos existam
const initializeFile = (filePath: string, initialData: any[] = []) => {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    }
};

// Helpers para ler e escrever arquivos JSON
const readFile = (filePath: string) => {
    initializeFile(filePath);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
};

const writeFile = (filePath: string, data: any) => {
    initializeFile(filePath);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to ${filePath}:`, error);
    }
};

// Posts
export const getPosts = (): Post[] => {
    return readFile(POSTS_FILE_PATH);
};

export const findPostById = (id: string): Post | undefined => {
    const posts = getPosts();
    return posts.find((post: Post) => post.id === id);
};

export const addPost = (newPost: Post) => {
    const posts = getPosts();
    posts.push(newPost);
    writeFile(POSTS_FILE_PATH, posts);
};

// Users
export const getUsers = () => readFile(USERS_FILE_PATH);

export const findUserByEmail = (email: string) => {
    const users = getUsers();
    return users.find((user: any) => user.email === email);
};

// Tags
export const getTags = () => readFile(TAGS_FILE_PATH);

export const addTag = (newTag: any) => {
    const tags = getTags();
    tags.push(newTag);
    writeFile(TAGS_FILE_PATH, tags);
};

// Função para criar um id único
export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
