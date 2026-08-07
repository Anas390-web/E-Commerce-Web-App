import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./src/features/Products-List/productListSlice";
import { cartReducer } from "./src/features/Cart/cartSlice";
import authReducer from "./src/features/Authentication/authSlice";
export const store = configureStore({
   reducer: {
      productList: productReducer,
      cart: cartReducer,
      auth: authReducer
   }
})