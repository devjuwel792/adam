import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "./services/authApi";

// Configure the Redux store with the RTK Query API reducer and middleware
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
