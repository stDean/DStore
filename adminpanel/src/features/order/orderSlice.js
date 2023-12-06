import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteOrd, editOrd, getOrdByUserId, getOrders } from "./orderService";

const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllOrders = createAsyncThunk(
  "order/get-orders",
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

export const deleteOrder = createAsyncThunk(
  "order/delete-order",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      return await deleteOrd({ token, id });
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

export const getOrderByUserId = createAsyncThunk(
  "order/get-orderByUser",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await getOrdByUserId({ id, token });
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

export const editOrder = createAsyncThunk(
  "order/edit-order",
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await editOrd({ data, token, id });
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
  name: "order",
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
      })
      .addCase(deleteOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = payload;
        state.message = "deleted";
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.orders = [];
        state.message = payload;
      })
      .addCase(getOrderByUserId.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrderByUserId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = payload;
        state.message = "orders by a user";
      })
      .addCase(getOrderByUserId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.orders = [];
        state.message = payload;
      })
      .addCase(editOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(editOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = payload;
        state.message = "updated";
      })
      .addCase(editOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.orders = [];
        state.message = payload;
      });
  },
});

export default orderSlice.reducer;
