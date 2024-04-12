import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Post } from "../model/post";
import { GET_POST_URL } from "./post.module";
import { map, take } from "rxjs";

@Injectable()
export class PostService {

  public postList: Post[] = [];

  constructor(@Inject(GET_POST_URL) private url: string, private httpClient: HttpClient) {
    this.httpClient
    .get<Post[]>(this.url)
    .pipe(
      take(1),
      map((posts) => posts.map(x => this.postList.push(x)))
    )
    .subscribe();
  }

  createPost(post: Post) {
    this.postList.push(post);
  }

}
