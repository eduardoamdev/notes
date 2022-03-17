import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import getNote from "../functions/getNote";
import axios from "axios";
import Loading from "./Loading";
import NavBar from "./NavBar";

const Note = () => {
  let [state, setState] = useState({
    loading: true,
    success: false,
    id: "",
    date: "",
    hour: "",
    title: "",
    content: "",
  });

  let params = useParams();

  let obtainNote = async () => {
    try {
      let info = await getNote(axios, params.noteId);
      if (info.success === true) {
        info.hour = info.hour.split(":");
        info.hour.pop();
        info.hour = info.hour.join(":");
        setState(info);
      } else {
        setState({
          loading: false,
          success: false,
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
      ) : state.success === true ? (
        <div>
          <NavBar private={true} />
          <div className="table-container">
            <div className="margin-bottom-3 links-container">
              <Link
                to={`/updateNote/${state.id}`}
                className="margin-bottom-3 link"
              >
                Update
              </Link>
              <Link
                to={`/deleteNote/${params.noteId}`}
                className="margin-bottom-3 link error"
              >
                Delete
              </Link>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>{state.date}</td>
                </tr>
                <tr>
                  <td>Hour</td>
                  <td>{state.hour}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{state.title}</td>
                </tr>
                <tr>
                  <td>Content</td>
                  <td>{state.content}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Navigate to={`/error/${"Server error"}`} />
      )}
    </div>
  );
};

export default Note;
