import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './loadingSecreen.slice';
import axios from 'axios';

export const getProductsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) =>{
            const listProducts = action.payload;
            return listProducts
        }
    }
})
    export const getProductThunk = () => (dispatch) => {
        dispatch(setIsLoading(true));
        return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
            .then((res) => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }

    export const filterProductThunk = (productfilter) => (dispatch) => {
        dispatch(setIsLoading(true));
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${productfilter}`)
            .then((res) => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }

    export const categoriesThunk = (categoryId) => (dispatch) => {
        dispatch(setIsLoading(true));
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${categoryId}`)
            .then((res) => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    }

export const { setProducts } = getProductsSlice.actions;

export default getProductsSlice.reducer;
