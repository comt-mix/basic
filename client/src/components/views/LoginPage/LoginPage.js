import { loginUser } from "../../../_actions/user_action"
import React, {useState} from 'react'
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
// import { request, response } from 'express'
import Auth from "../../../hoc/auth"


function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password
    }
    dispatch(loginUser(body))
      .then (response => {
        if(response.payload.loginSuccess) {
          navigate("/");
        } else {
          alert("error");
        }
      })
  }

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center"
      , width: "100%", height: "100vh"
    }}>
      <form style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default Auth(LoginPage, false);