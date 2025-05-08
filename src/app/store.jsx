// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
