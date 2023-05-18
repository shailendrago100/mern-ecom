import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    product: null,
  isFetching: false,
  error: false
};
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
   
    registerProductStart(state) {
      state.isFetching = true;
    },
    registerProductSuccess(state, action) {
      state.isFetching = false;
      state.product = action.payload;
    },
    registerProductFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    deleteProductStart(state) {
      state.isFetching = true;
    },
    deleteProductSuccess(state, action) {
      state.isFetching = false;
      state.message = action.payload;
      // state.product = action.payload;
    },
    deleteProductFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    updateProductStart(state) {
      state.isFetching = true;
      state.product = action.payload
    },
    updateProductSuccess(state, action) {
      state.isFetching = false;
      state.message = action.payload;
      // state.product = action.payload;
    },
    updateProductFailure(state) {
      state.isFetching = false;
      state.error = true;
    },
    
    



  }
});

export const {  registerProductStart , registerProductSuccess , registerProductFailure, deleteProductStart , deleteProductSuccess , deleteProductFailure  } = adminSlice.actions;

export default adminSlice;