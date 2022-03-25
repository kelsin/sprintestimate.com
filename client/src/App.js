import { Routes, Route } from "react-router-dom";

import Errors from "./Errors";
import Home from "./Home";
import Nav from "./Nav";
import Session from "./Session";
import User from "./User";

function App() {
  return (
    <div className="app">
      <Nav />
      <Errors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/:id" element={<Session />} />
      </Routes>
    </div>
  );
}

export default App;
