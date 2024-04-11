import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { PostListComponent } from '../post-list/post-list.component';
import { PostService } from '../services/post.service';
import { HttpClientModule } from '@angular/common/http';

export const GET_POST_URL = new InjectionToken<string>('GET_POST_URL');

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [PostComponent, PostListComponent],
  exports: [PostListComponent],
  providers: [
    {
      provide: GET_POST_URL,
      useValue: 'https://asmisalan.github.io/feedgram/posts.json'
    },
    PostService
  ]
})
export class PostModule {}
