import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const[error,setError]=useState(false);
  const[message,setMessage]=useState('')

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("/user/logIn", { ...user });
      localStorage.setItem("firstLogin", true);

      window.location.href = `/`;
    } catch (error) {
      setError(true)
      
      setMessage(error.response.data.message);
      
    }
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={onInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={onInputChange}
        />

        <div className="buttons">
          <input type="submit" value="LOGIN" />
          <Link to="/register">Register</Link>
        </div>
       <p id="login-error"> {error?message:""}</p>
      </form>
    </div>
  );
}

export default Login;
