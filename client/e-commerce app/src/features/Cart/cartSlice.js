import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

// IMPORTANT:
// THIS WAS NEEDED BACK THEN TO SHOW CART ITEMS IN THE CART COMPONENT SINCE CART ITEMS ONLY HAD TWO PROPERTIES PRODUCTID AND PRODUCT COUNT AND WE OVERWRITED THEM WITH PRODUCT PROPERTIES FROM THE PRODUCTS PRODUCTLIST NOW WE ARE DEALING WITH THAT WITH BACKEND WE DON'T NEED IT ANYMORE:
// // TWO SELECTORS TO BE MERGED INTO A SELECTOR FUNCTION:
// const selectProductItems = (state) => state.productList.products;
// const selectCartItems = (state) => state.cart.cartItems;

// // CREATING A SELECTOR FUNCTION WHICH MERGES TWO STATES AND RETURNS ONE OUTPUT:
// export const selectCartItemWithProductDetails = createSelector(
//    [selectProductItems, selectCartItems], // input selectors
//    // return values of each input selector
//    (products, cartItems) => {
//       return cartItems.map((cartItem) => {
//          const matchingProduct =  products.find((product) => {
//             return product._id === cartItem.productId
//          })
//          return {
//             ...matchingProduct,
//             productCount: cartItem.productCount,
//          }
//       })
//    }
// )

// POST REQUEST TO REGISTER THE USER CART ITEM(s):
export const saveUserCartItem = createAsyncThunk(
   'cart/saveUserCartItem',
   async (item, thunkApi) => {
      try {
         const token = await localStorage.getItem('accessToken');
         const url = import.meta.env.VITE_SERVER_CART_URL;
         const response = await fetch(`${url}/${item.productId}`, {
            method: 'POST',
            headers: {
               'Authorization': `Bearer ${token}`, // USER ID WILL BE TAKEN FROM TOKEN PAYLOAD
               'content-type': 'application/json'
            },
            body: JSON.stringify({
               product: item.productId,
               quantity: item.productCount
            })
         })
         const data = await response.json();
         if (!response.ok) {
            return thunkApi.rejectWithValue(data);
         }
         return data;
      } catch (error) {
         console.log(error.message);
         return thunkApi.rejectWithValue(error.message)
      }
   }
)

// GET USER CART:
export const getUserCart = createAsyncThunk(
   'cart/getUserCart',
   async (userData, thunkApi) => {
      try {
         const token = await localStorage.getItem('accessToken');
         const url = import.meta.env.VITE_SERVER_CART_URL;
         const response = await fetch(`${url}`, {
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${token}`,
               'content-type': 'application/json'
            }
         })
         const data = await response.json();
         if (!response.ok) {
            return thunkApi.rejectWithValue(data);
         }
         return data;
      } catch (error) {
         console.log(error.message);
         return thunkApi.rejectWithValue(error.message)
      }
   }
)

// DELETE USER CART ITEM:
export const deleteUserCartItem = createAsyncThunk(
   'cart/deleteUserCartItem',
   async (item, thunkApi) => {
      try {
         const token = localStorage.getItem('accessToken');
         const response = await fetch(`${import.meta.env.VITE_SERVER_CART_URL}/${item.productId}`, {
            method: 'DELETE',
            headers: {
               'Authorization': `Bearer ${token}`,
               'content-type': 'application/json'
            }
         })
         const data = await response.json();
         if (!response.ok) {
            return thunkApi.rejectWithValue(data);
         }
         return data;
      } catch (error) {
         console.log(error.message);
         return thunkApi.rejectWithValue(error.message)
      }
   }
)

// CLEAR USER CART:
export const clearUserCart = createAsyncThunk(
   'cart/clearUserCart',
   async (_, thunkApi) => {
      try {
         const token = await localStorage.getItem('accessToken');
         const response = await fetch(`${import.meta.env.VITE_SERVER_CART_URL}`, {
            method: 'DELETE',
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const data = await response.json();
         if(!response.ok) {
            return thunkApi.rejectWithValue(data)
         }
         return data;
      } catch (error) {
         console.log(error);
         return thunkApi.rejectWithValue(error)
      }
   }
)

const initialState = {
   cartItems: [],
   count: 0,
   totalAmount: 0,
   isLoading: true,
   error: null
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      // USED TO BUILT FOR FRONTEND, NOW BACKEND TAKES CARE OF IT
      addToCart: (state, action) => {
         state.count += action.payload.productCount;
         state.cartItems.push(action.payload);
      },
      increment: (state, action) => {
         const item = state.cartItems.find((cartItem) => {
            return cartItem.product._id === action.payload;
         });
         if (item) {
            item.quantity += 1
         }
      },
      decrement: (state, action) => {
         const item = state.cartItems.find((cartItem) => {
            return cartItem.product._id === action.payload
         })
         if (item) {
            item.quantity > 1 ? item.quantity -= 1 : 1
         }
      },
      // USED TO BUILT FOR FRONTEND, NOW BACKEND TAKES CARE OF IT
      deleteItem: (state, action) => {
         const items = state.cartItems.filter((cartItem) => {
            return cartItem.product._id !== action.payload
         })
         state.cartItems = items;

         // IF ITEMS REMOVED THAN CART COUNT SHOULD REMOVE AS WELL:
         let remainingItemsQuantity = 0;
         items.forEach((item) => {
            return remainingItemsQuantity += item.quanity;
         })
         state.count = remainingItemsQuantity;
      },
      // USED TO BUILT FOR FRONTEND, NOW BACKEND TAKES CARE OF IT
      clearCart: (state, action) => {
         state.cartItems = [];
         state.count = 0;
      }
   },
   extraReducers: (builder) => {
      builder
         // SAVE USER SELECTED ITEM TO CART:
         .addCase(saveUserCartItem.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(saveUserCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            const quantity = action.payload.cart.items.reduce((total, currentItem) => {
               return total += currentItem.quantity
            }, 0)
            state.count = quantity;
            state.cartItems = action.payload.cart.items
         })
         .addCase(saveUserCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
         // GET USER CART:
         .addCase(getUserCart.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            const quantity = action.payload.cart.items.reduce((total, currentItem) => {
               return total += currentItem.quantity
            }, 0)
            state.count = quantity;
            state.cartItems = action.payload.cart.items
         })
         .addCase(getUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
         // DELETE USER SINGLE PRODUCT FROM CART:
         .addCase(deleteUserCartItem.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteUserCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            const quantity = action.payload.cart.items.reduce((total, currentItem) => {
               return total += currentItem.quantity
            }, 0)
            state.count = quantity;
            state.cartItems = action.payload.cart.items
         })
         .addCase(deleteUserCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
         // CLEAR USER CART:
         .addCase(clearUserCart.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(clearUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
            state.count = 0;
         })
         .addCase(clearUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
         
   }
})

export const cartReducer = cartSlice.reducer;

export const { addToCart, increment, decrement, deleteItem, clearCart } = cartSlice.actions;