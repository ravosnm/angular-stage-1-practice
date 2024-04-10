import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input()
  public post!: {
    user: string;
    published: Date;
    content: string;
  };
  isCollapsed = true;

  toggleCollapse(collapse: boolean) {
    this.isCollapsed = collapse;
  }

}
