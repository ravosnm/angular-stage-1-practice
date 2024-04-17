import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Post } from '../../../model/post';
import { Observable, filter, map, take, tap } from 'rxjs';
import { PostService } from '../../post.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Store, createAction, props } from '@ngrx/store';
import { getPostToEdit } from '../../state/posts.selectors';
import { addPost, setPostToEdit, updatePost } from '../../state/posts.actions';
import { ComponentStore } from '@ngrx/component-store';
import { Actions, ofType } from '@ngrx/effects';

export interface PostFormComponentState {
  post: Post
}

const initialState: PostFormComponentState = {
  post: {
    user: '',
    published: new Date,
    content: ''
  }
}
// actions
export const createPostAction = createAction(
  '[PostForm ComponentStore] Create Post in GlobalStore',
  props<{ post: Post }>()
);
export const updatePostAction = createAction(
  '[PostForm ComponentStore] Update Post in GlobalStore',
  props<{ updatedPost: Post, outdatedPost: Post }>()
);

@Injectable()
export class PostFormComponentStore extends ComponentStore<PostFormComponentState> {
  constructor(public actions$: Actions, private globalStore: Store) {
    super(initialState);
  }

  // selectors
  getPost$ = this.select(
    (state) => state
  );
  // updaters
  setPostUserUpdater = this.updater((state, userName: string) => {
    const statePost: Post = state.post;
    statePost.user = userName
    return {
      ...state,
      post: statePost
    }
  });
  setPostContentUpdater = this.updater((state, content: string) => {
    const statePost: Post = state.post;
    statePost.content = content
    return {
      ...state,
      post: statePost
    }
  });
  // effects
  createPostEffect = this.effect(() =>
    this.actions$.pipe(
      ofType(createPostAction),
      map(action => {
        this.globalStore.dispatch(addPost({ post: action.post }))
      })
    )
  )


  updatePostEffect = this.effect(() =>
    this.actions$.pipe(
      ofType(updatePostAction),
      map(action => {
        this.globalStore.dispatch(updatePost({ updatedPost: action.updatedPost, outdatedPost: action.outdatedPost}))
        this.globalStore.dispatch(setPostToEdit({ post: {user: '', content: '', published: new Date()} }))
      })
    )
  )

}



@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, PostComponent, ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {

  post$: Observable<Post> = this.store.select(getPostToEdit);
  outdatedPost: Post = { user: '', content: '', published: new Date()};
  isNewPost = true;

  public postForm = this.formBuilder.group({
    userName: ["", [Validators.required, Validators.minLength(5)]],
    content: ["", [Validators.required, Validators.minLength(5)]]
  });

  public userNameErrors$ = this.postForm.statusChanges.pipe(
    map((x) => this.postForm.get('userName') as AbstractControl),
    filter((x) => x != null),
    map((control) => {
      const errors = [];
      if (control.getError('required')) {
        errors.push('UserName is required');
      }
      if (control.getError('minlength')) {
        errors.push('User length must be grater than 5 char.');
      }
      return errors;
    })
  );

  public contentErrors$ = this.postForm.statusChanges.pipe(
    map((x) => this.postForm.get('content') as AbstractControl),
    filter((x) => x != null),
    map((control) => {
      const errors = [];
      if (control.getError('required')) {
        errors.push('Post Content is required.');
      }
      if (control.getError('minlength')) {
        errors.push('Post length must be grater than 5 char.');
      }
      return errors;
    })
  );



  constructor(private formBuilder: FormBuilder, private _postService: PostService, private router: Router, private store: Store, private componentStore: PostFormComponentStore) {}

  ngOnInit() {
    this.post$.pipe(
      filter(x => x.user != '' && x.content != ''),
      take(1),
      map(x => {
        this.outdatedPost = x;
        this.isNewPost = false;
        this.postForm.controls.userName.setValue(this.outdatedPost.user);
        this.postForm.controls.content.setValue(this.outdatedPost.content);
      })).subscribe();
  }

  submit() {
    // const postData: Post = {
    //   user: this.postForm.value.userName ?? '',
    //   published: new Date(),
    //   content: this.postForm.value.content ?? '',
    // };
    this.componentStore.setPostUserUpdater(this.postForm.value.userName ?? '')
    this.componentStore.setPostContentUpdater(this.postForm.value.content ?? '')

    if(this.isNewPost) {

      this.componentStore.createPostEffect;
//      this._postService.createPost(postData);
    }
    else {
      this.componentStore.updatePostEffect;
//      this._postService.updatePost(postData, this.outdatedPost);
//      this.store.dispatch(setPostToEdit({ post: {user: '', content: '', published: new Date() } }))
    }
    this.router.navigate(['posts', 'list']);
  }

  cancel() {
    this.router.navigate(['posts', 'list']);
  }

}
