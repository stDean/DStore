import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  processOrder,
  removeCartItem,
  updateQty,
} from "./userService";

const initialState = {
  cartItem: [],
  userCart: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const addItemToCart = createAsyncThunk(
  "cart/add-cart",
  async ({ cartData, token }, { rejectWithValue }) => {
    try {
      return await addToCart({ cartData, token });
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

export const getUserCart = createAsyncThunk(
  "cart/get-cart",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await getCart({ token });
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

export const removeUserCart = createAsyncThunk(
  "cart/remove-cart",
  async ({ token, cartId }, { rejectWithValue }) => {
    try {
      return await removeCartItem({ token, cartId });
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

export const updateQuantity = createAsyncThunk(
  "cart/update-quantity",
  async ({ token, cartId, quantity }, { rejectWithValue }) => {
    try {
      return await updateQty({ token, cartId, quantity });
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

export const processUserOrder = createAsyncThunk(
  "user/process-order",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await processOrder({ token, data });
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addItemToCart.pending, state => {
        state.isLoading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItem = payload;
      })
      .addCase(addItemToCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(getUserCart.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userCart = payload;
      })
      .addCase(getUserCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(removeUserCart.pending, state => {
        state.isLoading = true;
      })
      .addCase(removeUserCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = payload;
      })
      .addCase(removeUserCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(updateQuantity.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.userCart = payload;
      })
      .addCase(updateQuantity.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(processUserOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(processUserOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userOrder = payload;
      })
      .addCase(processUserOrder.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      });
  },
});

export default userSlice.reducer;
