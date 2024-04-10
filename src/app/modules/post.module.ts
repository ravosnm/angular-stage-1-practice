import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { PostListComponent } from '../post-list/post-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PostComponent, PostListComponent],
  exports: [PostListComponent],
})
export class PostModule {}
