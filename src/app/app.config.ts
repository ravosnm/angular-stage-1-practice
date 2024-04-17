import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { PostsEffects } from './posts/state/post.effects';
import { POSTS_STATE_KEY, reducer } from './posts/state/posts.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const GET_POST_URL = new InjectionToken<string>('GET_POST_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: GET_POST_URL,
      useValue: 'https://asmisalan.github.io/feedgram/posts.json'
    },
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: POSTS_STATE_KEY, reducer: reducer }),
    provideEffects([PostsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

  ]
};

