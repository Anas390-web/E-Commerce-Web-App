import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./src/features/Products-List/productListSlice";
import { cartReducer } from "./src/features/Cart/cartSlice";
export const store = configureStore({
   reducer: {
      productList: productReducer,
      cart: cartReducer
   }
})