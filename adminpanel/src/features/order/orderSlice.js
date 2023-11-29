import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from "./orderService";

const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllOrders = createAsyncThunk(
  "brand/get-orders",
  async (token, { rejectWithValue }) => {
    try {
      return await getOrders(token);
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

export const orderSlice = createSlice({
  name: "customer",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(getAllOrders.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = payload;
        state.message = "success";
      })
      .addCase(getAllOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.orders = [];
        state.message = payload;
      });
  },
});

export default orderSlice.reducer;
