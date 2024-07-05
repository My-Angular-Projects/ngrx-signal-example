import { IPost } from './post.interface';

export interface IState {
  posts: IPost[];
  loading: boolean;
  error: string | null;
}
