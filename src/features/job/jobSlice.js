import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
}

export const createJob = createAsyncThunk(
    'job/createJob',
    async (job, thunkAPI) => {
      try {
        const resp = await customFetch.post('/jobs', job, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        }); 
        thunkAPI.dispatch(clearValues());
        return resp.data;
      } catch (error) {
          // basic setup
          if(error !== 200){
              console.log("error")
          }
          return thunkAPI.rejectWithValue(error.response.data.msg);
          // logout user
          
      }
    }   
  );

const jobSlice = createSlice({
    name: 'job',
    initialState,
    //reducers or reducer action
    //below reducer is updating our global state as per user input lablel and value

    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
          state[name] = value;
        },
        clearValues:()=>{
            // return {...initialState};
            return initialState
        }
}});
export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer