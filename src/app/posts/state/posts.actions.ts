import { createAction, props } from "@ngrx/store";
import { Post } from "../../model/post";

export const requestAllPosts = createAction(
  "[PostList] Request all posts"
);

export const loadPostsSuccess = createAction(
  '[PostList] Load posts success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[PostList] Load post failure',
  props<{ error: any }>()
);

export const loadPostsCount = createAction(
  '[PostList] Count posts'
);

export const addPost = createAction(
  '[PostForm] Add new posts',
  props<{ post: Post }>()
);

export const updatePost = createAction(
  '[PostForm] Update posts',
  props<{ updatedPost: Post, outdatedPost: Post }>()
);

export const deletePost = createAction(
  '[Post] Delete posts',
  props<{ post: Post }>()
);

export const setPostToEdit = createAction(
  '[Post] Set Post to edit',
  props<{ post: Post }>()
);



