import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logoutStart, logoutSuccess, logoutFailure  } from './auth-slice';
import { registerProductFailure , registerProductSuccess , registerProductStart, deleteProductStart , deleteProductSuccess , deleteProductFailure } from './admin-slice';
import {  updateProductFailure , updateProductStart , updateProductSuccess } from './product-slice'

import { publicRequest, userRequest } from '../request-methods';



export const login = ({email, password}) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await publicRequest.post('/auth/login', {email, password});
      dispatch(loginSuccess(response.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
};
export const register = ({username, email, password, passwordConfirm}) => {
  return async (dispatch) => {
    dispatch(registerStart());
    try {
      const response = await publicRequest.post('/auth/register', {username, email, password, passwordConfirm});
      dispatch(registerSuccess(response.data));
    } catch (err) {
      dispatch(registerFailure());
    }
  };
};
export const addAProduct = ({title, description, image, category, sizee , price , inStock}) => {
  return async (dispatch) => {
    dispatch(registerProductStart());
    try {
      const response = await userRequest.post('products/admin/add', {title, description, image, category, sizee, price , inStock});
      // const response = await publicRequest.post('/products/admin/add', {title, discription, image, category, size, color , price , inStock});
      dispatch(registerProductSuccess(response.data));
    } catch (err) {
      dispatch(registerProductFailure());
    }
  };
};
export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(deleteProductStart());
    try {
      const response = await userRequest.delete(`products/admin/delete/${id}`);
      // const response = await publicRequest.post('/products/admin/add', {title, discription, image, category, size, color , price , inStock});
      dispatch(deleteProductSuccess(response.message));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
};
export const updateProduct = ({id, title , description , image , category , sizee  , price , inStock}) => {
  return async (dispatch) => {
    dispatch(updateProductStart());
    try {
      const response = await userRequest.put(`products/admin/update/${id}`,{title , description , image , category , sizee  , price , inStock} );
      // const response = await publicRequest.post('/products/admin/add', {title, discription, image, category, size, color , price , inStock});
      dispatch(updateProductSuccess(response.message));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutStart());
    try {
      const response = await publicRequest.get('/auth/logout');
      dispatch(logoutSuccess(response.message));
    } catch (err) {
      dispatch(logoutFailure());
    }
  };
};