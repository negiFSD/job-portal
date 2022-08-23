import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import Loading from './Loading'
import { getAllJobs } from '../features/allJobs/allJobSlice'

function JobsContainer() {

    const {jobs, isLoading, page, totalJobs, numOfPages} = useSelector(store=>store.allJobs)
  
    const dispath = useDispatch()
    useEffect(()=>{
        dispath(getAllJobs())
    },[dispath])
    
    if(isLoading){
        return (
            <Wrapper>
              <Loading center={true}/>
            </Wrapper>
          );
    }
    if(jobs.length===0){
        return (
            <Wrapper>
              <h2>No jobs to display...</h2>
            </Wrapper>
          );
    }

   return (
    <Wrapper>
    <h5>  {totalJobs} job{jobs.length > 1 && 's'} found</h5>
    <div className='jobs'>
      {jobs.map((job) => {
        // console.log(job)
        return <Job key={job._id} {...job} />;
      })}
    </div>
  </Wrapper>
  );
}

export default JobsContainer
