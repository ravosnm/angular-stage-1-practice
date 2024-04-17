import { Inject, Injectable } from "@angular/core";
import { Post } from "../model/post";
import { GET_POST_URL } from "../app.config";
import { Store } from "@ngrx/store";
import { getPostsCount } from "./state/posts.selectors";
import { addPost, deletePost, updatePost } from "./state/posts.actions";

@Injectable()
export class PostService {

  public postList: Post[] = [];
  public postsCount$ = this.store.select(getPostsCount);

  constructor(@Inject(GET_POST_URL) private url: string, private store: Store) { }

  createPost(post: Post) {
    this.store.dispatch(addPost({ post: post }))
  }
  updatePost(updatedPost: Post, outdatedPost: Post) {
    this.store.dispatch(updatePost({ updatedPost, outdatedPost}))
  }
  deletePost(post: Post) {
    this.store.dispatch(deletePost({ post }))
  }



}
