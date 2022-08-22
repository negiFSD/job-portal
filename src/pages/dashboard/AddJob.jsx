import React, { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FormRow, FormRowSelect } from "../../components";
import { handleChange, clearValues, createJob } from "../../features/job/jobSlice";

function AddJob() {

  // below we are getting state from job slice
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    // editJobId,
  } = useSelector((store) => store.job);


  // Below we are getting state from user slice
  const {user}  = useSelector((store)=>store.user)

  const dispatch = useDispatch();

  // Below we are updatig user input values, instead of local useState here we are saving and updating data in job slice
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  //here we are sending entered data to server
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    dispatch(createJob({position, company, jobType, status}))
  };

  // below use effect is publishing the user location on page render from userslice
useEffect(()=>{
if(!isEditing){
  dispatch(handleChange({name: 'jobLocation', value:user.location}))
}
},[dispatch, isEditing, user.location])

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>

        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* job type */}

          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* btn container */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}

export default AddJob;
