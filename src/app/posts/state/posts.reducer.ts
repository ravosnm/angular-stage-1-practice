import { createReducer, on, Action } from '@ngrx/store';
import { Post } from '../../model/post';
import { addPost, deletePost, loadPostsSuccess, requestAllPosts, setPostToEdit, updatePost } from './posts.actions';

export const POSTS_STATE_KEY = 'posts';

export interface PostState {
  posts: Post[];
  loaded: boolean;
  postToEdit: Post;
}

export const initialState: PostState = {
  posts: [],
  loaded: false,
  postToEdit: {
    user: '',
    content: '',
    published: new Date()
  }
};

const postsReducer = createReducer(
  initialState,
  on(requestAllPosts, state => ({
    ...state,
    loaded: false
    })
  ),

  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
      loaded: true
    };
  }),

  on(addPost, (state, action) => {
    const posts = state.posts.slice();
    posts.push(action.post);
    return {
      ...state,
      posts: posts,
    };
  }),

  on(deletePost, (state, action) => {
    const posts = state.posts.slice();
    posts.splice(posts.findIndex(x => x === action.post), 1);
    return {
      ...state,
      posts: posts,
    };
  }),

  on(setPostToEdit, (state, action) => {
    return {
      ...state,
      postToEdit: action.post,
    };
  }),

  on(updatePost, (state, action) => {
    const posts = state.posts.slice();
    const index: number = posts.findIndex(x => x === action.outdatedPost)
    posts[index] = action.updatedPost;
    return {
      ...state,
      posts: posts,
    };
  })

);

export function reducer(state: PostState | undefined, action: Action) {
  return postsReducer(state, action);
}
