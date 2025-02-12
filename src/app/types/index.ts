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
  slug: string;
  imageUrl?: string; // Opcional
  createdAt: string;
  tags: string[];
};
