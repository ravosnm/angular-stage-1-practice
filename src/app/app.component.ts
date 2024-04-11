import { Component, Input } from '@angular/core';
import { PostModule } from './modules/post.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'angular-stage-1-practice';
}
