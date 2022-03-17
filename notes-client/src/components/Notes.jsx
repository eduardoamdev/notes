import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Loading from "./Loading";
import domain from "../domain";

const Notes = () => {
  let [state, setState] = useState({
    loading: true,
    success: false,
    notes: [],
  });

  const getNotes = async () => {
    try {
      let response = await axios.get(`${domain}/api/user/notes`, {
        headers: {
          token: window.localStorage.token,
        },
      });
      if (response.data.success === false) {
        setState({
          loading: false,
          success: false,
          notes: [],
        });
      } else {
        let notes = [];
        response.data.notes.forEach((note) => {
          let date = note.date.split("T");
          let hour = date[1].split(".")[0];
          date = date[0];
          notes.push({
            id: note._id,
            title: note.title,
            date,
            hour,
          });
        });
        setState({
          loading: false,
          success: true,
          notes,
        });
      }
    } catch (error) {
      setState({
        loading: false,
        success: false,
        notes: [],
      });
    }
  };

  useEffect(() => {
    getNotes();
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
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th className="hour">Hour</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {state.notes.map((note) => {
                  return (
                    <tr key={note.id}>
                      <td>
                        <Link to={`/note/${note.id}`} className="link">
                          <div className="link-container">{note.date}</div>
                        </Link>
                      </td>
                      <td className="hour">
                        <Link to={`/note/${note.id}`} className="link">
                          <div className="link-container">{note.hour}</div>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/note/${note.id}`} className="link">
                          <div className="link-container">{note.title}</div>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
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

export default Notes;
