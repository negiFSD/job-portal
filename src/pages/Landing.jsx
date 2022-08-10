import React from 'react'
import  logo from '../assets/images/logo.svg'
import  main from '../assets/images/main2.svg'
// import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'



function Landing() {
  return (

       <Wrapper>
      <nav>
        <img src={logo} alt='jobster logo' className='logo' />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>some text Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam numquam ab architecto impedit molestiae nam est repellat nobis dolores iusto assumenda tempore illum minus fuga ipsum neque ad veritatis, saepe alias similique odio, commodi voluptas. Non doloribus distinctio numquam veritatis ad saepe? Voluptates, iusto enim?</p>
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>

  )
}

export default Landing