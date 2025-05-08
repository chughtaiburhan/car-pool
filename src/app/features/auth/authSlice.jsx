import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async action to login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/v1/login`, {
        phone,
        password,
      });

      // Save the token to AsyncStorage when login is successful
      await AsyncStorage.setItem('token', response.data.token); // Adjust based on your API response

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const initialState = {
  user: null,
  role: null,
  loading: false,
  error: null,
};

// Slice for auth state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Remove token from AsyncStorage on logout
      AsyncStorage.removeItem('token');

      // Reset user state
      state.user = null;
      state.role = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Assuming the role is part of the user object
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export logout action to be used in components
export const { logout } = authSlice.actions;
export default authSlice.reducer;
