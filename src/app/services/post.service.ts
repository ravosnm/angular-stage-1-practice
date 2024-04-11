import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Post } from "../model/post";
import { GET_POST_URL } from "../modules/post.module";

@Injectable()
export class PostService {
  constructor(@Inject(GET_POST_URL) private baseUrl: string, private httpClient: HttpClient) {}

  getAllPost() {
    return this.httpClient.get<Post[]>(this.baseUrl);
  }
}
