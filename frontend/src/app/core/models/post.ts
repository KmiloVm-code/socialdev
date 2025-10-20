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
  author: User | string;
  image?: string;
  likes: (User | string)[];
  comments: Comment[];
  createdAt: Date;
  updatedAt?: Date;
}
