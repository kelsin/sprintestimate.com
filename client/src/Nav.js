import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import useSocket from "./hooks/useSocket";
import useUser from "./hooks/useUser";

const Nav = () => {
  const { connected } = useSocket();
  const [user] = useUser();
  const session = useSelector((state) => state.session);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ☕
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {session && (
              <li className="nav-item">
                <NavLink className="nav-link" to={`/${session.id}`}>
                  {session.id}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="d-flex">
          <div className="me-3">{connected ? "🟢" : "🔴"}</div>
          <Link to="/user">{user.name}</Link>
          <Link to="/user">
            <div
              className="ms-3"
              style={{
                height: "24px",
                width: "24px",
                backgroundColor: user.color,
              }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
