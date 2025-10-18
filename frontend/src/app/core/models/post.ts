export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
}
