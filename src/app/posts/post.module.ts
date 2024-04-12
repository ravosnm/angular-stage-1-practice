import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


export const GET_POST_URL = new InjectionToken<string>('GET_POST_URL');

const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./components/post-list/post-list.component').then(x => x.PostListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./components/post-form/post-form.component').then(x => x.PostFormComponent)
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: GET_POST_URL,
      useValue: 'https://asmisalan.github.io/feedgram/posts.json'
    },
    PostService
  ]
})
export class PostModule {}
