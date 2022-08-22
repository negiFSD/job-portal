import React from 'react'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from './JobInfo';
import moment from 'moment'
import { deleteJob } from '../features/job/jobSlice';
import { setEditJob } from '../features/job/jobSlice';

function Job({
   _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) {
// console.log(company)
const dispatch = useDispatch()
const date = moment(createdAt).format('MMM Do, YYYY');

  const dispath = useDispatch()
  return (
    <Wrapper>
    <header>
      <div className='main-icon'>{company.charAt(0)}</div>  
      <div className='info'>
        <h5>{position}</h5>
        <p>{company}</p>
      </div>
    </header>
    <div className='content'>
    <div className='content-center'>
  <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
  <JobInfo icon={<FaCalendarAlt />} text={date} />
  <JobInfo icon={<FaBriefcase />} text={jobType} />
  <div className={`status ${status}`}>{status}</div>
</div>
      <footer>
        <div className='actions'>
          <Link
            to='/add-job'
            className='btn edit-btn'
            onClick={() => {
              dispatch(
                setEditJob({
                  editJobId: _id,
                  position,
                  company,
                  jobLocation,
                  jobType,
                  status,
                })
              );
            }}
          >
            Edit
          </Link>
          <button
            type='button'
            className='btn delete-btn'
            onClick={() => {
              dispath(deleteJob(_id))
              console.log(`delete job ${_id}`);
            }}
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </Wrapper>
  )
}

export default Job
