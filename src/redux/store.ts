import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/users";
import userReducer from "./slices/user";
import modalsReducer from "./slices/modalsopen";
import joboffersReducer from "./slices/joboffers";
import postsReducer from "./slices/posts";
import servicesReducer from "./slices/services";
import lightReducer from "./slices/lightSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    job_offers: joboffersReducer,
    modals: modalsReducer,
    posts: postsReducer,
    services: servicesReducer,
    light: lightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
