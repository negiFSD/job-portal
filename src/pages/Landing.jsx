import React from "react";
import main from "../assets/images/main2.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from 'react-router-dom';

// This is the landing page on [ / ] (home) route.

function Landing() {
  return (
    //wrapper is the styled component
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            some text Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ullam numquam ab architecto impedit molestiae nam est repellat nobis
            dolores iusto assumenda tempore illum minus fuga ipsum neque ad
            veritatis, saepe alias similique odio, commodi voluptas. Non
            doloribus distinctio numquam veritatis ad saepe? Voluptates, iusto
            enim?
          </p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing;
