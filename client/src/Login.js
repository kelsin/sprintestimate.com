import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HuePicker } from 'react-color';

import { sendMessage } from './ws';

import { login } from './store/user';

const Login = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#fff');
  const user = useSelector(state => state.user);

  const nameHandler = event => setName(event.target.value);
  const colorHandler = color => setColor(color.hex);
  const loginHandler = () => {
    sendMessage({type:"login",name,color});
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Login</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form>
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="name" value={name} onChange={nameHandler}/>
            <label htmlFor="color" className="form-label">Color</label>
            <input type="hidden" className="form-control" id="color" value={color}/>
            <HuePicker color={color} onChange={colorHandler}/>
            <button type="button" className="btn btn-primary mt-3" onClick={loginHandler}>Login</button>
          </form>
        </div>
        <div className="col-8">
          <h4>Example</h4>
          {name} <div style={{height: "24px", width: "24px", backgroundColor: color}}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
