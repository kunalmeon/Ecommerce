import React, { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confrimPassword: "",
  });
  const state=useContext(GlobalState)
  const onInputChange = (e) => {
    const { name, value } = e.target;
    
    setUser({ ...user, [name]: value });
  
  };

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("/user/signUp", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = `/detail/${state.id}`;
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  }

  return (
    <div className="register-page">
      <form onSubmit={handleLoginSubmit} className="form">
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={onInputChange}
        />

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

        <input
          type="password"
          placeholder="confirm password"
          required
          name="confirmPassword"
          onChange={onInputChange}
        />

        <div className="buttons">
          <input type="submit" value="Register" />
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
