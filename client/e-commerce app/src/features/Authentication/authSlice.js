import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
   username: '',
   token: localStorage.getItem('accessToken') || null,
   isLoading: true,
   error: ''
}

// USER REGISTRATION:
export const registerUser = createAsyncThunk(
   'auth/registerUser',
   async (userData, thunkApi) => {
      try {
         let url = `${import.meta.env.VITE_SERVER_BASE_URL}/register`;
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'content-type': 'application/json'
            },
            body: JSON.stringify({
               username: userData.username,
               email: userData.email,
               password: userData.password
            })
         })
         console.log(response)
         const data = await response.json();
         if (!response.ok) {
            // EXPLICITLY FAILING THE ASYNC THUNK AND CATCHING THE SERVER ERROR RESPONSE:
            return thunkApi.rejectWithValue(data);
         }
         localStorage.setItem('token', data.token);
         return data;
      } catch (error) {
         return thunkApi.rejectWithValue(error.message);
      }
   }
)

// USER LOGIN:
export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async (userData, thunkApi) => {
      try {
         let url = `${import.meta.env.VITE_SERVER_BASE_URL}/login`
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'content-type': 'application/json'
            },
            body: JSON.stringify({
               email: userData.email,
               password: userData.password
            })
         })
         const data = await response.json();
         if (!response.ok) {
            // EXPLICITLY FAILING THE ASYNC THUNK AND CATCHING THE SERVER ERROR RESPONSE:
            return thunkApi.rejectWithValue(data)
         }
         localStorage.setItem('accessToken', data.token);
         return data;
      } catch (error) {
         return thunkApi.rejectWithValue(error.message);
      }
   }
)

// FETCH USER DETAILS WHEN LOGGED-IN:
export const fetchUserDetails = createAsyncThunk(
   'user/fetchUserDetails',
   async(userData, thunkApi) => {
      try {
         const token = localStorage.getItem('accessToken');
         // THROW AN ERROR IF TOKEN DOES NOT EXIST:
         if(!token) {
            console.log('Token does not exist!');
            // EXPLICITLY FAILING THE ASYNC THUNK AND CATCHING THE SERVER ERROR RESPONSE:
            return thunkApi.rejectWithValue('No token found');
         }
         const response = await fetch(import.meta.env.VITE_SERVER_BASE_URL,{
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${token}`,
               'content-type': 'application/json'
            }
         });
         const data = await response.json();
         if(!response.ok){
            // EXPLICITLY FAILING THE ASYNC THUNK AND CATCHING THE SERVER ERROR RESPONSE:
            return thunkApi.rejectWithValue(data)
         }
         return data;
      } catch (error) {
         console.log(error)
         return thunkApi.rejectWithValue(error.message)
      }
   }
)

const authSlice = createSlice({
   name: 'register',
   initialState,
   reducers: {
      logout: (state) => {
         state.username = '';
         state.token = '';
         localStorage.removeItem('accessToken')
         state.error = '';
      }
   },
   extraReducers: (builder) => {
      builder
         // RESISTER HANDLERS
         .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
         })
         // LOGIN HANDLERS
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.username = action.payload.username;
            state.token = action.payload.token;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
         // GET USER DETAILS HANDLERS
         .addCase(fetchUserDetails.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.username = action.payload.username;
         })
         .addCase(fetchUserDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
   }
})

const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
export default authReducer