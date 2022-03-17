import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Session from "./components/Session";
import Error from "./components/Error";
import Notes from "./components/Notes";
import Note from "./components/Note";
import UpdateNote from "./components/UpdateNote";
import DeleteNote from "./components/DeteteNote";
import CreateNote from "./components/CreateNote";

const App = () => {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error/:error" element={<Error />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/session" element={<Session />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/note/:noteId" element={<Note />} />
          <Route path="/updateNote/:noteId" element={<UpdateNote />} />
          <Route path="/deleteNote/:noteId" element={<DeleteNote />} />
          <Route path="/createNote" element={<CreateNote />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
