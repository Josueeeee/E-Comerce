import { configureStore } from '@reduxjs/toolkit'
import getProductsSlice  from './slices/getProdcuts'
import  loadingScreenSlice   from './slices/loadingSecreen.slice'


export default configureStore({
    reducer: {
        loading : loadingScreenSlice,
        getProduct : getProductsSlice
    }
})

