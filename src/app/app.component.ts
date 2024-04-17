import { Component } from '@angular/core';
import { PostModule } from './posts/post.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPostsCount } from './posts/state/posts.selectors';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PostModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  postCount$: Observable<number> = this.store.select(getPostsCount);
  constructor(private store: Store) { }
}
