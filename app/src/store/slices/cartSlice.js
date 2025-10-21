import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: {
        length: 0,
        isLogged: false
    }
};

const cartSlice = createSlice({ 
    initialState,
    name: 'cart',
    reducers: {
        UpdateUiCartQuantity(state, action) {
            const length = action.payload;
            state.cart = length;
        },
        updateQuantity(state, action) {
            const id = action.payload.id;
            const qty = action.payload.qty;
        },
        remove(state, action) {
            state.cart = state.cart.filter(f => f.id !== action.payload);
        }
    }
})

export const { UpdateUiCartQuantity, updateQuantity, remove } = cartSlice.actions;

export default cartSlice.reducer;