import NavBar from "./NavBar";
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import domain from "../domain";

const DeleteNote = () => {
  let [state, setState] = useState({
    back: false,
    error: false,
    success: false,
    message: "",
  });

  let params = useParams();

  const handleBack = () => {
    setState({
      back: true,
    });
  };

  const handleDelete = async () => {
    try {
      let response = await axios.delete(
        `${domain}/api/user/deleteNote/${params.noteId}`,
        {
          headers: {
            token: window.localStorage.token,
          },
        }
      );
      if (response.data.success === false) {
        setState({
          ...state,
          message: "Deleted not succesfull",
        });
      } else {
        setState({
          ...state,
          success: true,
        });
      }
    } catch (error) {
      setState({
        error: true,
      });
    }
  };

  return (
    <div>
      <NavBar private={true} />
      {state.back === true ? (
        <div>
          <Navigate to={`/note/${params.noteId}`} />
        </div>
      ) : state.error === true ? (
        <Navigate to={`/error/${"Server error"}`} />
      ) : state.success === true ? (
        <Navigate to="/notes" />
      ) : (
        <div className="delete-container">
          <h3 className="margin-bottom-5">Are you sure?</h3>
          <div className="buttons-container margin-bottom-5">
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <span className="error">{state.message}</span>
        </div>
      )}
    </div>
  );
};

export default DeleteNote;
