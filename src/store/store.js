import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/authApi';
import { dashboardApi } from './services/dashboardApi';
import { userManagementApi } from './services/userManagementApi';
import authReducer from './authSlice';

// Configure the Redux store with the RTK Query API reducer and middleware
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    auth: authReducer,
    // add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, dashboardApi.middleware, userManagementApi.middleware),
});

export default store;
