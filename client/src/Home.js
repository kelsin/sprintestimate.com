import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { sendMessage } from './ws';

import User from './User';

const Home = () => {
  const session = useSelector(state => state.session);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Redirect to /user page if you don't have user data at all
  if (!user.name) {
    return <Navigate to="/user" />
  }

  const newSession = () => {
    sendMessage({
      type: "createSession"
    });
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <button className="btn btn-primary me-3" onClick={newSession}>New Session</button>
    </div>
  );
};

export default Home;
