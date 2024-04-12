import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Post } from '../../../model/post';
import { filter, map } from 'rxjs';
import { PostService } from '../../post.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, PostComponent, ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {

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
  constructor(private formBuilder: FormBuilder, private _postService: PostService, private router: Router) {}

  submit() {
    const postData: Post = {
      user: this.postForm.value.userName ?? '',
      published: new Date(),
      content: this.postForm.value.content ?? '',
    };
    this._postService.createPost(postData);
    this.router.navigate(['posts', 'list']);
  }

  cancel() {
    this.router.navigate(['posts', 'list']);
  }

}
