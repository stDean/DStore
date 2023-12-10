import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { postEnq } from "./enquiryService";

const initialState = {
  enquiry: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const postEnquiry = createAsyncThunk(
  "enq/create-enq",
  async ({ data }, { rejectWithValue }) => {
    try {
      return await postEnq({ data });
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

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(postEnquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(postEnquiry.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiry = payload;
        state.message = "success";
      })
      .addCase(postEnquiry.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      });
  },
});

export default enquirySlice.reducer;
