import { Component, OnInit } from '@angular/core';
import { Post } from '../../../model/post';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { requestAllPosts } from '../../state/posts.actions';
import { Observable, filter, take, tap } from 'rxjs';
import { getPosts, getPostsCount, getPostsLoaded } from '../../state/posts.selectors';
import { SharedPipesModule } from '../../../pipes/shared-pipes.module';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent, MatGridListModule, MatButtonModule, MatPaginatorModule, SharedPipesModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  posts$: Observable<Post[]> = this.store.select(getPosts);
  postsLoaded$: Observable<boolean> = this.store.select(getPostsLoaded);
  postsCount$: Observable<number> = this.store.select(getPostsCount);

  page_size = 4;
	page_number = 1;
	pageSizeOptions = [4 , 8 , 20];

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.postsLoaded$.pipe(
      filter(x => !x),
      take(1),
      tap(x => {
        this.store.dispatch(requestAllPosts())
      })).subscribe();
  }

  handlePage(e: PageEvent) {
		this.page_size = e.pageSize;
		this.page_number = e.pageIndex + 1;
	}

  addPost() {
    this.router.navigate(['posts', 'create']);
  }

}
