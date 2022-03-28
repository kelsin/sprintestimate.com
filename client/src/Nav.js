import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import useSocket from "./hooks/useSocket";
import useUser from "./hooks/useUser";

const Nav = () => {
  const { connected } = useSocket();
  const [user] = useUser();
  const session = useSelector((state) => state.session);

  return (
    <nav className="nav">
      <Link className="nav__logo" to="/">
        ☕
      </Link>
      <ul className="nav__menu">
        <li className="nav__menuitem">
          <NavLink to="/">Home</NavLink>
        </li>
        {session && session.id && (
          <li className="nav__menuitem">
            <NavLink to={`/${session.id}`}>{session.id}</NavLink>
          </li>
        )}
      </ul>
      <div className="user">
        <div className="user__connected">{connected ? "🟢" : "🔴"}</div>
        <Link to="/user">{user.name}</Link>
        <Link to="/user">
          <div
            className="user__color"
            style={{ backgroundColor: user.color }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
