import { Component, Input } from '@angular/core';
import { PostModule } from './posts/post.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent { }
