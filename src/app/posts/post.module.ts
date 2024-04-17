import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';
import { RouterModule, Routes } from '@angular/router';

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
    RouterModule.forChild(routes)],
  declarations: [],
  exports: [],
  providers: [
    PostService
  ]
})
export class PostModule {}
