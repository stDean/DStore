import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCoupon, getCoupons } from "./couponService";

const initialState = {
  coupons: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const Coupons = createAsyncThunk(
  "brand/get-coupons",
  async (token, { rejectWithValue }) => {
    try {
      return await getCoupons(token);
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

export const createCoupons = createAsyncThunk(
  "coupon/create-coupon",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createCoupon({ data, token });
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

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(Coupons.pending, state => {
        state.isLoading = true;
      })
      .addCase(Coupons.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = payload;
        state.message = "success";
      })
      .addCase(Coupons.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = [];
        state.message = payload;
      })
      .addCase(createCoupons.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = payload;
        state.message = "created";
      })
      .addCase(createCoupons.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = [];
        state.message = payload;
      });
  },
});

export default couponSlice.reducer;
