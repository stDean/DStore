import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "./customerService";

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "customer/get-customers",
  async (token, { rejectWithValue }) => {
    try {
      return await getUsers(token);
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

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = payload;
        state.message = "success";
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.customers = [];
        state.message = payload;
      });
  },
});

export default customerSlice.reducer;
