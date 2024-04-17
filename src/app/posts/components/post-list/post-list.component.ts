import { Component, Injectable, OnInit } from '@angular/core';
import { Post } from '../../../model/post';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { Store, createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { requestAllPosts } from '../../state/posts.actions';
import { Observable, filter, map, take, tap } from 'rxjs';
import { getPosts, getPostsCount, getPostsLoaded } from '../../state/posts.selectors';
import { SharedPipesModule } from '../../../pipes/shared-pipes.module';
import { ComponentStore } from '@ngrx/component-store';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Actions, ofType } from '@ngrx/effects';

export const EXAMPLE_STATE_KEY = 'posts';
export interface ExampleState {
  isWorking: boolean,
  description: string
}
export const initialState: ExampleState = {
    isWorking: false,
    description: 'uyyy no anda...'
}
// actions
export const updateWorkingStatus = createAction(
  '[PostList ComponentStore] Update isWorking',
  props<{ isWorking: boolean }>()
);

@Injectable()
export class PostListComponentStore extends ComponentStore<ExampleState> {

  constructor(public actions$: Actions) {
    super(initialState);
  }

  // selectors
  getExampleState$ = this.select(
    (state) => state
  );
  getIsWorkingExampleState$ = this.select(
    (state) => state.isWorking
  );

  // updater (reducer)
  setIsWorking = this.updater((state, isWorking: boolean) => ({
    ...state,
    isWorking: isWorking
  }));
  // effect
  updateIswWorkingEffect = this.effect(() =>
    this.actions$.pipe(
        ofType(updateWorkingStatus),
        map((action) => {
          console.log(action.isWorking);
          this.setIsWorking(action.isWorking)}))
    );
}

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent, MatGridListModule, MatButtonModule, MatPaginatorModule, SharedPipesModule, MatButtonToggleModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [PostListComponentStore]
})
export class PostListComponent implements OnInit {
  // GLOBAL Store
  posts$: Observable<Post[]> = this.store.select(getPosts);
  postsLoaded$: Observable<boolean> = this.store.select(getPostsLoaded);
  postsCount$: Observable<number> = this.store.select(getPostsCount);

// Component Store
  isWorkingState$: Observable<boolean> = this.componentStore.getIsWorkingExampleState$;

  page_size = 4;
	page_number = 1;
	pageSizeOptions = [4 , 8 , 20];

  constructor(private router: Router, private store: Store, private componentStore: PostListComponentStore) {}

  ngOnInit() {
    this.postsLoaded$.pipe(
      filter(x => !x),
      take(1),
      tap(x => {
        this.store.dispatch(requestAllPosts())
      })).subscribe();


  }

  toggleIsWorking(param: boolean) {
    this.componentStore.setIsWorking(param);
  }

  handlePage(e: PageEvent) {
		this.page_size = e.pageSize;
		this.page_number = e.pageIndex + 1;
	}

  addPost() {
    this.router.navigate(['posts', 'create']);
  }

}
