import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'

function ToggleMember({values, handleChange, toggleMember}) {

   
  return (
    <Wrapper>
    <p>
      {values.isMember ? 'Not a member yet?' : 'Already a member?'}

      <button type='button' onClick={toggleMember} className='member-btn'>
        {values.isMember ? 'Register' : 'Login'}
      </button>
    </p>
  </Wrapper>
  )
}

export default ToggleMember