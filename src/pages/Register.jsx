import React from "react";
import { useState, useEffect } from "react";
import { Logo, FormRow, ToggleMember } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      // toast.success(`welcome `)
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("fill all required values");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    } else {
      dispatch(registerUser({ email: email, password: password, name: name }));
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* for name field  */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* for email field  */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* for password field  */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <ToggleMember
          values={values}
          handleChange={handleChange}
          toggleMember={toggleMember}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? `loading...` : `submit`}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
        >
          {isLoading ? "loading..." : "demo"}
        </button>
      </form>
    </Wrapper>
  );
}

export default Register;
