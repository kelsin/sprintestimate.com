import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HuePicker } from "react-color";

import useUser from "./hooks/useUser";
import Card from "./Card";
import { Context } from "./Socket";

const User = () => {
  const { send } = useContext(Context);
  const [user] = useUser();
  const [name, setName] = useState(user.name);
  const [color, setColor] = useState(user.color);
  const navigate = useNavigate();

  const nameHandler = (event) => setName(event.target.value);
  const colorHandler = (color) => setColor(color.hex);
  const save = () => {
    const msg = { type: "login", name, color };
    if (user) {
      msg.id = user.id;
    }
    send(msg);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>User Information</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="name"
              value={name}
              onChange={nameHandler}
            />
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="hidden"
              className="form-control"
              id="color"
              value={color}
            />
            <HuePicker color={color} onChange={colorHandler} />
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={save}
            >
              Save
            </button>
          </form>
        </div>
        <div className="col-8">
          <h4>Example</h4>
          <div className="row">
            {[1, 2, 3, 5, 8, 13, 99, "?", "…", "☕"].map((points) => (
              <div key={`example-${points}`} className="col">
                <Card name={name} color={color} points={points} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
