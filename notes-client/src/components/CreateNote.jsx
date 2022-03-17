import { useState } from "react";
import { Navigate } from "react-router-dom";
import checkDateHour from "../functions/checkDateHour";
import longWord from "../functions/longWord";
import axios from "axios";
import NavBar from "./NavBar";
import domain from "../domain";

const CreateNote = () => {
  let [state, setState] = useState({
    date: "",
    hour: "",
    title: "",
    content: "",
    message: "",
    noteId: "",
    create: false,
    error: false,
  });

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
      let response = await axios.post(
        `${domain}/api/user/createNote`,
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
          error: true,
        });
      } else if (
        response.data.success === false &&
        response.data.infoError === true
      ) {
        setState({
          ...state,
          message: response.data.message,
        });
      } else {
        setState({
          ...state,
          noteId: response.data.id,
          create: true,
        });
      }
    } catch (error) {
      setState({
        ...state,
        error: true,
      });
    }
  };

  return (
    <div>
      <NavBar private={true} />
      {state.error === true ? (
        <Navigate to={`/error/${"Server error"}`} />
      ) : state.create === true ? (
        <Navigate to={`/note/${state.noteId}`} />
      ) : (
        <div className="create-update-container">
          <form onSubmit={handleSubmit} className="flex-column form">
            <div className="flex-column margin-bottom-2">
              <label className="margin-bottom-1">Date:</label>
              <input type="date" name="date" onChange={handleChange} />
            </div>
            <div className="flex-column margin-bottom-2">
              <label className="margin-bottom-1">Hour:</label>
              <input type="time" name="hour" onChange={handleChange} />
            </div>
            <div className="flex-column margin-bottom-2">
              <label className="margin-bottom-1">Title:</label>
              <input type="text" name="title" onChange={handleChange} />
            </div>
            <div className="flex-column margin-bottom-2">
              <label className="margin-bottom-1">Content:</label>
              <textarea
                rows="10"
                cols="25"
                type="text"
                name="content"
                onChange={handleChange}
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
      )}
    </div>
  );
};

export default CreateNote;
