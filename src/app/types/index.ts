export type SafeUser = {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  summary: string;
  imageUrl?: string;
  authorId: string,
  createdAt: string;
  tags: string[];
};
