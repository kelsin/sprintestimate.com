import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HuePicker } from "react-color";

import useUser from "./hooks/useUser";
import Card from "./Card";
import { Context } from "./Socket";

import "./user.scss";

const User = () => {
  const { send } = useContext(Context);
  const [user, updateUser] = useUser();
  const [name, setName] = useState(user.name);
  const [color, setColor] = useState(user.color);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const nameHandler = (event) => setName(event.target.value);
  const colorHandler = (color) => setColor(color.hex);
  const redirect = searchParams.get("redirect");

  const save = () => {
    const msg = { type: "login", name, color };
    if (user) {
      msg.id = user.id;
    }
    updateUser({ name, color });
    send(msg);

    if (redirect) {
      navigate(redirect);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="page">
      <h1>User Information</h1>
      <p>
        Please type in the name you want displayed on your poker cards and
        choose a favorite color.
      </p>
      <div className="form prefs">
        <label htmlFor="name" className="prefs__label">
          Name
        </label>
        <input
          type="text"
          className="prefs__input"
          id="name"
          placeholder="name"
          value={name}
          onChange={nameHandler}
        />
        <input
          type="hidden"
          className="prefs__input"
          id="color"
          value={color}
        />
        <div className="prefs__color">
          <HuePicker color={color} onChange={colorHandler} />
        </div>
        <button type="button" className="button prefs__button" onClick={save}>
          Save
        </button>
      </div>
      <h3>Example</h3>
      <div className="cards">
        {[1, 2, 3, 5, 8, 13, 99, "?", "☕"].map((points) => (
          <Card
            key={`example-${points}`}
            name={name}
            color={color}
            points={points}
          />
        ))}
      </div>
    </div>
  );
};

export default User;
