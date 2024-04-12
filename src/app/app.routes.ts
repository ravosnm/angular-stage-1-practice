import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./posts/post.module').then(x => x.PostModule)
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  }
];
