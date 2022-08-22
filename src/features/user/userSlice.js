import {createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import customFetch from "../../utils/axios";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";


// initial state of slice
const initialState ={
    isLoading:false,
    isSidebarOpen: false,
    user:getUserFromLocalStorage()
};


// sending new user registration data to server
export const registerUser  = createAsyncThunk(
    'user/registerUser', async(user, thunkAPI)=>{
       try{
            const resp = await customFetch.post('/auth/register', user)
            return resp.data             
       }
       catch(e){
        return thunkAPI.rejectWithValue(e.response.data.msg);
    }
    }
);

//  for user login
export const loginUser = createAsyncThunk(
    'user/loginUser', async(user, thunkAPI)=>{
       try{
        const resp = await customFetch.post('/auth/login', user);
        return resp.data;
       }
       catch(e){
        return thunkAPI.rejectWithValue(e.response.data.msg);

       }
    }
)

// for updating user details
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkAPI) => {
      try {
        const resp = await customFetch.patch('/auth/updateUser', user, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            // authorization: `Bearer `
          },
        });
        return resp.data;
      } catch (error) {
        if(error.response.status === 401){
            thunkAPI.dispatch(logOutUser())
           return thunkAPI.rejectWithValue(`Unauthorized!. Logging out...`)
        }
        
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );

const userSlice =  createSlice({
    name : 'user',
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logOutUser:(state)=>{
            state.user=null
            state.isSidebarOpen =!state.isSidebarOpen
            toast.success('logout successfully')
            removeUserFromLocalStorage()
        }
    },
    extraReducers:{
        [registerUser.pending]:(state)=>{
            state.isLoading=true
        },
        [registerUser.fulfilled]:(state,{payload})=>{
            const {user} = payload
            state.isLoading=false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Hello there ${user.name}`)
        },
        [registerUser.rejected]: (state, {payload})=>{
            state.isLoading = false
            toast.error(payload)
        },
        [loginUser.pending]:(state)=>{
            state.isLoading = true
        },
        [loginUser.fulfilled]:(state,{payload})=>{
            const {user} = payload
            state.isLoading=false
            state.user =user
            addUserToLocalStorage(user)
            toast.success(`welcome back ${user.name}`)
        },
        [loginUser.rejected]:(state, {payload})=>{
            state.isLoading=false
            toast.error(payload)
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true;
          },
          [updateUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
      
            addUserToLocalStorage(user);
            toast.success('User Updated');
          },
          [updateUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          },
    }
})
export const {toggleSidebar, logOutUser}=userSlice.actions;
export default userSlice.reducer;