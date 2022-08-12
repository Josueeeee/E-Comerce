import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './loadingSecreen.slice';
import getConfig from "../../utils/getConfig"

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (status, action)=>{
            const cart = action.payload
            return cart;
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then((res) => dispatch(setCart(res.data.data?.cart.products)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}
 export const postCartThunk = (data) => (dispatch) => {
     dispatch(setIsLoading(true));
     return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", data, getConfig())
         .then(() => dispatch(getCartThunk()))
         .finally(() => dispatch(setIsLoading(false)));
 }
 
 export const updatinProductInCartthunk = (data) => (dispatch) => {
     dispatch(setIsLoading(true));
     return axios.patch("https://ecommerce-api-react.herokuapp.com/api/v1/cart", data, getConfig())
         .then(() => dispatch(/* action */))
         .finally(() => dispatch(setIsLoading(false)));
 }

 export const deletProductThunk = (id) => (dispatch) => {
     dispatch(setIsLoading(true));
     return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`,  getConfig())
         .then(() => dispatch(getCartThunk()))
         .catch(error => console.log(error.response))
         .finally(() => dispatch(setIsLoading(false)));
 }

 export const purcharseProductThunk = () => (dispatch) => {
     dispatch(setIsLoading(true));
     return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases',{},getConfig())
         .then(() => dispatch(setCart([])))
         .finally(() => dispatch(setIsLoading(false)));
 }

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
