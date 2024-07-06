import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { IPost, IState } from '../types';
import { PostModel } from '../models';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PostsService } from '../services';
import { pipe, switchMap, tap } from 'rxjs';

const initialState: IState = {
  posts: [],
  loading: false,
  error: null,
};

export const PostStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    totalPostsCount: computed(() => store.posts().length),
  })),
  withMethods((store, postService = inject(PostsService)) => ({
    addPost(title: string): void {
      const newPost: IPost = new PostModel(
        parseInt(crypto.randomUUID()),
        title
      );
      patchState(store, { posts: [...store.posts(), newPost] });
    },
    removePost(id: number): void {
      patchState(store, {
        posts: store.posts().filter((post: IPost) => post.id !== id),
      });
    },
    loadPosts: rxMethod<void>(
      pipe(
        switchMap(() =>
          postService
            .getAllPosts()
            .pipe(tap((posts: IPost[]) => patchState(store, { posts })))
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadPosts();
    },
  })
);
