import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import checkDateHour from "../functions/checkDateHour";
import longWord from "../functions/longWord";
import getNote from "../functions/getNote";
import axios from "axios";
import Loading from "./Loading";
import NavBar from "./NavBar";
import domain from "../domain";

const UpdateNote = () => {
  let [state, setState] = useState({
    loading: true,
    success: false,
    updated: false,
    date: "",
    hour: "",
    title: "",
    content: "",
    message: "",
  });

  let params = useParams();

  let obtainNote = async (msg) => {
    try {
      let info = await getNote(axios, params.noteId);
      if (info.success === true) {
        info.hour = info.hour.split(":");
        info.hour.pop();
        info.hour = info.hour.join(":");
        setState({
          ...state,
          loading: info.loading,
          success: info.success,
          date: info.date,
          hour: info.hour,
          title: info.title,
          content: info.content,
        });
      } else {
        setState({
          ...state,
          loading: false,
          success: false,
          updated: false,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        success: false,
        updated: false,
      });
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let dateHour = `${state.date}T${state.hour}:00`;
    if (!checkDateHour(dateHour)) {
      setState({
        ...state,
        message: "Introduce date and hour properly",
      });
      return;
    }
    let titleContent = [state.title, state.content];
    let tooLongWord = longWord(titleContent);
    if (tooLongWord) {
      setState({
        ...state,
        message: "Don't introduce too long words",
      });
      return;
    }
    try {
      let response = await axios.put(
        `${domain}/api/user/updateNote/${params.noteId}`,
        {
          title: state.title,
          content: state.content,
          date: dateHour,
        },
        {
          headers: {
            token: window.localStorage.token,
          },
        }
      );
      if (
        response.data.success === false &&
        response.data.infoError === false
      ) {
        setState({
          ...state,
          loading: false,
          success: false,
        });
      } else if (
        response.data.success === false &&
        response.data.infoError === true
      ) {
        setState({
          ...state,
          loading: false,
          success: true,
          updated: false,
          message: response.data.message,
        });
      } else {
        setState({
          ...state,
          loading: false,
          success: true,
          updated: true,
          message: response.data.message,
        });
      }
    } catch (error) {
      setState({
        loading: false,
        success: false,
      });
    }
  };

  useEffect(() => {
    obtainNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {state.loading === true ? (
        <Loading />
      ) : state.success === true && state.updated === false ? (
        <div>
          <NavBar private={true} />
          <div className="create-update-container">
            <Link
              to={`/note/${params.noteId}`}
              className="margin-bottom-3 link"
            >
              Back
            </Link>
            <form onSubmit={handleSubmit} className="flex-column form">
              <div className="flex-column margin-bottom-2">
                <label className="margin-bottom-1">Date:</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={state.date}
                />
              </div>
              <div className="flex-column margin-bottom-2">
                <label className="margin-bottom-1">Hour:</label>
                <input
                  type="time"
                  name="hour"
                  onChange={handleChange}
                  value={state.hour}
                />
              </div>
              <div className="flex-column margin-bottom-2">
                <label className="margin-bottom-1">Title:</label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={state.title}
                />
              </div>
              <div className="flex-column margin-bottom-2">
                <label className="margin-bottom-1">Content:</label>
                <textarea
                  rows="10"
                  cols="25"
                  type="text"
                  name="content"
                  onChange={handleChange}
                  value={state.content}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="submit margin-bottom-2"
              />
              <span className="error">{state.message}</span>
            </form>
          </div>
        </div>
      ) : state.updated === false ? (
        <Navigate to={`/error/${"Server error"}`} />
      ) : (
        <Navigate to={`/note/${params.noteId}`} />
      )}
    </div>
  );
};

export default UpdateNote;
