import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/authApi";
import { dashboardApi } from "./services/dashboardApi";
import { userManagementApi } from "./services/userManagementApi";
import { jobManagementApi } from "./services/jobManagementApi";
import { jobMatchingApi } from "./services/jobMatchingApi";
import { settingApi } from "./services/settingApi";
import { disputeManagementApi } from "./services/disputeManagementApi";
import { communicationApi } from "./services/communicationApi";
import authReducer from "./authSlice";
import { userApi } from "./services/user/userApi";
import { patientManagementApi } from "./services/patientManagementApi";

// Configure the Redux store with the RTK Query API reducer and middleware
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    [patientManagementApi.reducerPath]: patientManagementApi.reducer,
    [jobManagementApi.reducerPath]: jobManagementApi.reducer,
    [jobMatchingApi.reducerPath]: jobMatchingApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [disputeManagementApi.reducerPath]: disputeManagementApi.reducer,
    [communicationApi.reducerPath]: communicationApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      dashboardApi.middleware,
      userManagementApi.middleware,
      jobManagementApi.middleware,
      jobMatchingApi.middleware,
      settingApi.middleware,
      userApi.middleware,
      disputeManagementApi.middleware,
      communicationApi.middleware,
      patientManagementApi.middleware
    ),
});

export default store;
