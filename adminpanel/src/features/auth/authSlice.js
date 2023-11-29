import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./authService";

const userDefaultState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userDefaultState,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const loginUser = createAsyncThunk(
  "auth/admin-login",
  async (currentUser, { rejectWithValue }) => {
    try {
      return await login(currentUser);
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
        state.message = "success";
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = payload;
      });
  },
});

export default authSlice.reducer;
