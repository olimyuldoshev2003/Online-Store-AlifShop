import { configureStore } from "@reduxjs/toolkit";
import states from "../reducers/states";
// ...

export const store = configureStore({
  reducer: {
    states
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
