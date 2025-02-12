import fs from 'fs';
import path from 'path';
import { Post } from '@/app/types';

const POSTS_FILE_PATH = path.join(process.cwd(), 'src/data', 'posts.json');
const USERS_FILE_PATH = path.join(process.cwd(), 'src/data', 'users.json');
const TAGS_FILE_PATH = path.join(process.cwd(), 'src/data', 'tags.json');


// Helpers para ler e escrever arquivos JSON
const readFile = (filePath: string) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const writeFile = (filePath: string, data: any) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Posts
export const getPosts = (): Post[] => {
    const data = fs.readFileSync(POSTS_FILE_PATH, "utf8");
    return JSON.parse(data);
};
export const findPostById = (id: string): Post | undefined => {
    const posts = getPosts();
    return posts.find((post: Post) => post.id === id);
};
export const addPost = (newPost: any) => {
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

// Função para criar um id unico
export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
