import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import domain from "../domain";

const PrivateRoute = () => {
  let [loading, setLoading] = useState({ loading: true });
  let [success, setSuccess] = useState({ success: false });
  let [message, setMessage] = useState({ message: "" });
  let verify = async () => {
    let response;
    try {
      response = await axios.get(`${domain}/api/user/validate`, {
        headers: { token: window.localStorage.token },
      });
      setSuccess({ success: response.data.success });
    } catch (error) {
      setMessage({ message: "Server error" });
      setSuccess({ success: false });
      setLoading({ loading: false });
      return;
    }
    if (response.data.success === false) {
      setMessage({ message: response.data.message });
    }
    setLoading({ loading: false });
  };

  useEffect(() => {
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading.loading === true ? (
    <Loading />
  ) : success.success === false ? (
    <Navigate to={`/error/${message.message}`} />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
