export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  skills?: string[];
  bio?: string;
  profession?: string;
  projects?: Project[];
  role?: 'admin' | 'user';
  createdAt?: Date;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  url?: string;
}