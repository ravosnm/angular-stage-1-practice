import { Component, Input } from '@angular/core';
import { Post } from '../model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input()
  public post!: Post;
  isCollapsed = true;

  toggleCollapse(collapse: boolean) {
    this.isCollapsed = collapse;
  }

}
