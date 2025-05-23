export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface FeedType {
  title: string;
  description: string;
  urlToImage: string;
  author: string;
}

export type ColorAvailable = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'background';
