import { User } from './user';

export interface Comment {
  user: User | string;
  comment: string;
  _id?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: author;
  image?: image;
  attachments?: attachment[];
  tags?: string[];
  likes: (User | string)[];
  comments: Comment[];
  createdAt: Date;
  updatedAt?: Date;
}

interface author {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

interface image {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
}

interface attachment {
  url: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface createPost {
  title: string;
  content: string;
  image?: File;
  attachments?: File[];
  tags?: string[];
}
