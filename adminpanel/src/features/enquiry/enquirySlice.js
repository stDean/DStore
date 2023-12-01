import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEnquires } from "./enquiryService";

const initialState = {
  enquires: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const Enquires = createAsyncThunk(
  "enquiry/get-enquires",
  async (_, { rejectWithValue }) => {
    try {
      return await getEnquires();
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

export const enquireSlice = createSlice({
  name: "enquiry",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(Enquires.pending, state => {
        state.isLoading = true;
      })
      .addCase(Enquires.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquires = payload;
        state.message = "success";
      })
      .addCase(Enquires.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.enquires = [];
        state.message = payload;
      });
  },
});

export default enquireSlice.reducer;
