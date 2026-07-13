import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://fakestoreapi.com/products';
export const fetchProducts = createAsyncThunk(
   'products/fetchProducts',
   async (name, thunkAPI) => {
      try {
         const response = await fetch(url);
         const data = await response.json();
         return data;
         console.log(data);
      } catch (error) {
         console.log(error);
         return thunkAPI.rejectWithValue(error.message);
      }
   }
)

const initialState = {
   products: [],
   isLoading: true,
   error: null
}

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
         })
         .addCase(fetchProducts.rejected, (state) => {
            state.isLoading = false;
         })
   }
})

export const productReducer = productsSlice.reducer;