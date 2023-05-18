import { createSlice } from '@reduxjs/toolkit';


  

const initialState = {
    
  product: {},
  isFetching: false,
  error: false,
 
};
const productSlice = createSlice({
  name: 'prod',
  initialState,
  reducers: {
   
   

    updateProductStart(state, action) {
     
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

export const {  updateProductFailure , updateProductStart , updateProductSuccess } = productSlice.actions;

export default productSlice;