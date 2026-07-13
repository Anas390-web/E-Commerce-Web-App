import { createSelector, createSlice } from "@reduxjs/toolkit";

// TWO SELECTORS TO BE MERGED INTO A SELECTOR FUNCTION:
const selectProductItems = (state) => state.productList.products;
const selectCartItems = (state) => state.cart.cartItems;

// CREATING A SELECTOR FUNCTION WHICH MERGES TWO STATES AND RETURNS ONE OUTPUT:
export const selectCartItemWithProductDetails = createSelector(
   [selectProductItems, selectCartItems], // input selectors
   // return values of each input selector
   (products, cartItems) => {
      return cartItems.map((cartItem) => {
         const matchingProduct =  products.find((product) => {
            return product.id === cartItem.productId
         })
         return {
            ...matchingProduct,
            productCount: cartItem.productCount,
         }
      })
   }
)
const initialState = {
   cartItems: [],
   count: 0,
   totalAmount: 0,
   isLoading: true,
   isAddedToCart: false
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         state.count += action.payload.productCount;
         state.cartItems.push(action.payload);
      },
      increment: (state, action) => {
         const item = state.cartItems.find((cartItem) => {
            return cartItem.productId === action.payload
         })
         if(item) {
            item.productCount += 1
         }
      },
      decrement: (state, action) => {
         const item = state.cartItems.find((cartItem) => {
            return cartItem.productId === action.payload
         })
         if(item){
            item.productCount > 0 ? item.productCount -= 1 : 1
         }
      },
      deleteItem: (state, action) => {
         const items = state.cartItems.filter((product) => {
            return product.productId !== action.payload
         })
         state.cartItems = items;

         // IF ITEMS REMOVED THAN CART COUNT SHOULD REMOVE AS WELL:
         let remainigProductsCount = 0;
         items.forEach((product) => {
            remainigProductsCount += product.productCount;
         })
         state.count = remainigProductsCount;
      },
      clearCart: (state, action) => {
         state.cartItems = [];
         state.count = 0;
      }
   }
})

export const cartReducer = cartSlice.reducer;

export const { addToCart, increment, decrement, deleteItem, clearCart } = cartSlice.actions;