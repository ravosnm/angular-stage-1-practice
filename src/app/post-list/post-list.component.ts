import { Component, Input,  OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../model/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public posts$!: Observable<Post[]>;

  constructor(private _postService: PostService) {}

  ngOnInit() {
    this.posts$ = this._postService.getAllPost()
  }
}
