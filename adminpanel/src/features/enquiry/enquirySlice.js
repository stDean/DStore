import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteEnq, editEnq, getEnq, getEnquires } from "./enquiryService";

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

export const deleteEnquiry = createAsyncThunk(
  "enq/delete-enq",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      return await deleteEnq({ token, id });
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

export const singleEnquiry = createAsyncThunk(
  "enq/get-enq",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getEnq(id);
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

export const editEnquiry = createAsyncThunk(
  "enquiry/edit-enquiry",
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await editEnq({ data, token, id });
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
      })
      .addCase(deleteEnquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquires = payload;
        state.message = "deleted";
      })
      .addCase(deleteEnquiry.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.enquires = [];
        state.message = payload;
      })
      .addCase(singleEnquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(singleEnquiry.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquires = payload;
        state.message = "single enquiry";
      })
      .addCase(singleEnquiry.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.enquires = [];
        state.message = payload;
      })
      .addCase(editEnquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(editEnquiry.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquires = payload;
        state.message = "updated";
      })
      .addCase(editEnquiry.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.enquires = [];
        state.message = payload;
      });
  },
});

export default enquireSlice.reducer;
