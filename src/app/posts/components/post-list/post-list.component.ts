import { Component, Input,  OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Post } from '../../../model/post';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent, MatGridListModule, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public postList: Post[] = [];

  constructor(private _postService: PostService, private router: Router) {}

  ngOnInit() {
    this.postList = this._postService.postList;
  }

  addPost() {
    this.router.navigate(['posts', 'create']);
  }
}
