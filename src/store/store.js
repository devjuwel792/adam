import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Configure the Redux store with the RTK Query API reducer and middleware
export const store = configureStore({
  reducer: {

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
 
    ),
});

export default store;
