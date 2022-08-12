import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './loadingSecreen.slice';

export const purcharseSlice = createSlice({
    name: 'purcharse',
    initialState: [],
    reducers: {
        setPurcharse:(state, action)=>{
            const purcharse = action.payload;
            return purcharse
        }
    }
})

export const getPurcharseThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then((res) => dispatch(setPurcharse(res.data.data.purchases)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}


export const { setPurcharse } = purcharseSlice.actions;

export default purcharseSlice.reducer;
