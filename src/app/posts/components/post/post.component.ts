import { Component, Input } from '@angular/core';
import { Post } from '../../../model/post';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deletePost, setPostToEdit } from '../../state/posts.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input()
  public post!: Post;
  isCollapsed = true;

  constructor(private store: Store, private router: Router) { }

  toggleCollapse(collapse: boolean) {
    this.isCollapsed = collapse;
  }

  deletePost(post: Post) {
    this.store.dispatch(deletePost({ post }))
  }

  editPost(post: Post) {
    this.store.dispatch(setPostToEdit({ post }))
    this.router.navigate(['posts', 'create']);
  }
}
