import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cart.slice'
import getProductsSlice  from './slices/getProdcuts'
import purcharseSlice from './slices/getPurcharse.slice'
import  loadingScreenSlice   from './slices/loadingSecreen.slice'


export default configureStore({
    reducer: {
        loading : loadingScreenSlice,
        getProduct : getProductsSlice,
        cart : cartSlice,
        purchase: purcharseSlice,
    }
})

    