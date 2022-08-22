import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

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

//asynthunk functiona are written in job thunk and called here
export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk)


const jobSlice = createSlice({
  name: "job",
  initialState,
  //reducers or reducer action
 
  reducers: {
     //below reducer is updating our global state as per user input lablel and value
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    // adding default location to job option
    clearValues: () => {
      return {...initialState, jobLocation:getUserFromLocalStorage()?.location || '' };
    },
    // converting add job to edit job and also sending default values as per user jobs component
    setEditJob:(state, {payload})=>{
      return {...state, isEditing:true, ...payload}
    }
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
    },
    [deleteJob.fulfilled]:(state, {payload})=>{
      toast.success(payload)
    },
    [deleteJob.fulfilled]:(state, {payload})=>{
      toast.success(payload)
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Modified...');
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
