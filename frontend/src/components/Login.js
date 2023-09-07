import {React, useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/users/tokens/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        "email": email, 
        "password": password, 
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => {  
          setUser(user)
          navigate("/checks")
      })
      } else {
        response.json().then((response) => {
          setErrors(response.error_description[0])
        })
      }
    });
  }
  

  useEffect(() => {
    if (user) { 
      navigate("/checks")
     }
  },[user, navigate])

  return (
    (<div className="form_container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">email </label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br></br>
        <label htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          /><br></br>
          <p><b>{errors}</b></p>
        <button type="submit">Login</button>
      </form>
    </div>)
  );
}

export default Login;
