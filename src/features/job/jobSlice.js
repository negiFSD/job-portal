import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { logOutUser } from "../user/userSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};


// sending user data to create new job to the server
export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const resp = await customFetch.post("/jobs", job, {
        headers: {
          //below we are jwt from usr slice (user.user.slice) >>>here 1st user is slice name 2nd user is user state and token is the key.
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      // basic setup
      // return thunkAPI.rejectWithValue(error.response.data.msg);
      // logout user
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg); //this will throw an error and that error we will use as a payload in extrareducer pending promise
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  //reducers or reducer action
  //below reducer is updating our global state as per user input lablel and value

  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {...initialState, jobLocation:getUserFromLocalStorage()?.location || '' };
      // return initialState;
    },
  },
  extraReducers:{
    [createJob.pending]: (state)=>{
      state.isLoading=true
    },
    [createJob.fulfilled] : (state, action)=>{
      state.isLoading=false
      toast.success('Job created')
    },
    [createJob.rejected]: (state, {payload})=>{
      state.isLoading=false
      toast.error(payload)
    }
  },
});
export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
