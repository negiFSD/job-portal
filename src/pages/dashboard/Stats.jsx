import React, {useEffect} from 'react'
import { ChartsContainer, StatsContainer, } from '../../components'
import Loading from '../../components/Loading'
import { useSelector, useDispatch } from 'react-redux'
import { showStats } from '../../features/allJobs/allJobSlice'

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats