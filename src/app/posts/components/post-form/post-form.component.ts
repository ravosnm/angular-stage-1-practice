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
import { Store } from '@ngrx/store';
import { getPostToEdit } from '../../state/posts.selectors';
import { PostFormComponentStore, createPostAction, updatePostAction } from './post-form.component.store';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, PostComponent, ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  providers: [PostFormComponentStore]
})
export class PostFormComponent implements OnInit {

  post$: Observable<Post> = this.store.select(getPostToEdit);
  updatedPost: Post = { user: '', content: '', published: new Date()};
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

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store, private componentStore: PostFormComponentStore) {
  }

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

    this.postForm.valueChanges.pipe(
      map((values) => this.componentStore.postUpdater(values))
    ).subscribe();

  }

  submit() {
    if(this.isNewPost) {
      this.store.dispatch(createPostAction());
    }
    else {
      this.store.dispatch(updatePostAction({outdatedPost: this.outdatedPost}));
    }
    this.router.navigate(['posts', 'list']);
  }

  cancel() {
    this.router.navigate(['posts', 'list']);
  }

}
