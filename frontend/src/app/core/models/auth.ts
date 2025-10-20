import { User } from './user';

export interface Auth {
  id: string;
  email: string;
  token: string;
  user: User;
}
