import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { IPost } from '../types';
import { PostModel } from '../models';

const POSTS: IPost[] = [
  new PostModel(1, 'First post'),
  new PostModel(2, 'Second post'),
  new PostModel(3, 'Third post'),
];

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public getAllPosts(): Observable<IPost[]> {
    return of(POSTS).pipe(delay(3000));
  }
}
