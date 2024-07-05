import { IPost } from '../types';

export class PostModel implements IPost {
  constructor(
    readonly id: number,
    readonly title: string
  ) {}
}
