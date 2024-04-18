import { Injectable } from "@angular/core";
import { Post } from "../model/post";
import { Store } from "@ngrx/store";
import { addPost, deletePost, updatePost } from "./state/posts.actions";

@Injectable()
export class PostService {

  constructor(private store: Store) { }

  // createPost(post: Post) {
  //   this.store.dispatch(addPost({ post: post }))
  // }
  // updatePost(updatedPost: Post, outdatedPost: Post) {
  //   this.store.dispatch(updatePost({ updatedPost, outdatedPost}))
  // }
  deletePost(post: Post) {
    this.store.dispatch(deletePost({ post }))
  }



}
