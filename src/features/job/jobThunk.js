import customFetch from "../../utils/axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobSlice";
import { clearValues } from "./jobSlice";
import { logOutUser } from "../user/userSlice";
import authHeader from "../../utils/authHeader";




//****** sending user data to create new job to the server
export const createJobThunk =    async (job, thunkAPI) => {
    try {
      const resp = await customFetch.post("/jobs", job, 
      // below we are using custom header and passing thunkAPI to it
        authHeader(thunkAPI)
      );
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      // logout user
      if (error.response.status === 401) {
        thunkAPI.dispatch(logOutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg); //this will throw an error and that error we will use as a payload in extrareducer pending promise
    }
  }


  //******/ delete job request
  export const deleteJobThunk =  async(jobId, thunkAPI)=>{
    thunkAPI.dispatch(showLoading())
    try{  
      const resp = await customFetch.delete(`/jobs/${jobId}`,authHeader(thunkAPI));
        thunkAPI.dispatch(getAllJobs())
        return resp.data.msg
    }
    catch(error){
      thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }}

    //*******/ edit job request
    export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
        try {
          const resp = await customFetch.patch(`/jobs/${jobId}`, job, authHeader(thunkAPI));
          thunkAPI.dispatch(clearValues());
          return resp.data;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.msg);
        }
      };