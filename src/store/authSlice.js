import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        user_id: action.payload.user_id,
        user_full_name: action.payload.user_full_name,
        user_email: action.payload.user_email,
        user_phone_number: action.payload.user_phone_number,
        user_profile_picture: action.payload.user_profile_picture,
        is_approved: action.payload.is_approved,
        role: action.payload.role,
      };
      state.token = action.payload.access;
      localStorage.setItem('authToken', action.payload.access);
      localStorage.setItem('refreshToken', action.payload.refresh);
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      if (token && user) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { loginSuccess, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
