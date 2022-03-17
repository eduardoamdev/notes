import NavBar from "./NavBar";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import domain from "../domain";

const Session = () => {
  let [state, setState] = useState({
    loading: true,
    success: false,
    username: "",
  });

  const getInfo = async () => {
    try {
      let response = await axios.get(`${domain}/api/user/session`, {
        headers: {
          token: window.localStorage.token,
        },
      });
      if (response.data.success === false) {
        setState({
          loading: false,
          success: false,
          username: "",
        });
      } else {
        setState({
          loading: false,
          success: true,
          username: response.data.user.username,
        });
      }
    } catch (error) {
      setState({
        loading: false,
        success: false,
        username: "",
      });
    }
  };

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {state.loading === true ? (
        <Loading />
      ) : state.success === true ? (
        <div>
          <NavBar private={true} />
          <div className="main-container flex-center title-container">
            <h1>Hello {state.username}</h1>
          </div>
        </div>
      ) : (
        <Navigate to={`/error/${"Server error"}`} />
      )}
    </div>
  );
};

export default Session;
