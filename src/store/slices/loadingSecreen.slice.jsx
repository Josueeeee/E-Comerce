import { createSlice } from '@reduxjs/toolkit';

export const loadingScreenSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading: (state, action)=>{
            const loading = action.payload;
            return loading
        }
    }
})

export const { setIsLoading } = loadingScreenSlice.actions;

export default loadingScreenSlice.reducer;
