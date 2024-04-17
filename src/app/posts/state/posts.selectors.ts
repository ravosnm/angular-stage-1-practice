import { createFeatureSelector, createSelector } from "@ngrx/store";
import { POSTS_STATE_KEY, PostState } from "./posts.reducer";

export const getPostsInitialState = createFeatureSelector<PostState>(POSTS_STATE_KEY);

export const getPosts = createSelector(
  getPostsInitialState,
  state => {
    return state.posts?? []
  }
);

export const getPostsCount = createSelector(
  getPosts,
  posts => {
    return posts?.length
  }
);

export const getPostsLoaded = createSelector(
  getPostsInitialState,
  state => state.loaded
);

export const getPostToEdit = createSelector(
  getPostsInitialState,
  state => state.postToEdit
);

