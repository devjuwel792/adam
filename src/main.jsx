import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import "./index.css";
import router from "./router/Routes.jsx";
import store from './store/store';
import { initializeAuth } from './store/authSlice';

// Initialize auth state from localStorage
store.dispatch(initializeAuth());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
