import { Component, Input } from '@angular/core';
import { Post } from '../../../model/post';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
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
