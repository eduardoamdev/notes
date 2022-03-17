import { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import NavBar from "./NavBar";
import domain from "../domain";

const Login = () => {
  let [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });
  let [success, setSuccess] = useState({
    submitted: false,
    success: false,
    text: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${domain}/api/auth/login`, formInfo);
      if (response.data.success === true) {
        window.localStorage.token = response.data.token;
        setSuccess({
          submitted: true,
          success: true,
        });
      } else {
        setSuccess({
          submitted: true,
          success: false,
          text: response.data.message,
        });
      }
    } catch (error) {
      setSuccess({
        submitted: true,
        success: false,
        text: "Server error",
      });
    }
  };

  const handleChange = (event) => {
    setFormInfo({
      ...formInfo,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <NavBar private={false} />
      {success.submitted === false ||
      (success.submitted === true && success.success === false) ? (
        <div className="flex-center form-container">
          <form onSubmit={handleSubmit} className="flex-column form">
            <h2 className="margin-bottom-2">Log in</h2>
            <div className="flex-column margin-bottom-2">
              <label className="margin-bottom-1">Username:</label>
              <input type="text" name="username" onChange={handleChange} />
            </div>
            <div className="flex-column margin-bottom-2">
              <label className="margin-bottom-1">Password:</label>
              <input type="text" name="password" onChange={handleChange} />
            </div>
            <input
              type="submit"
              value="Submit"
              className="submit margin-bottom-2"
            />
            <span className="error">{success.text}</span>
          </form>
        </div>
      ) : (
        <Navigate to="/session" />
      )}
    </div>
  );
};

export default Login;
