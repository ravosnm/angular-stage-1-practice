import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadPostsFailure,
  loadPostsSuccess,
  requestAllPosts
} from './posts.actions';
import { Post } from '../../model/post';

import { GET_POST_URL } from "../../app.config";

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllPosts),
      switchMap(() =>
        this.httpClient.get<Post[]>(this.url)
          .pipe(
            map(posts => loadPostsSuccess({ posts })),
            catchError(async (error) => loadPostsFailure({ error }))
          )
      ),
    )
  );

  constructor(@Inject(GET_POST_URL) private url: string, private actions$: Actions, private httpClient: HttpClient) {}
}
