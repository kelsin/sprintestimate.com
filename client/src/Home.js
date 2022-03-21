import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { addError } from './store/errors';
import { sendMessage } from './ws';

import Login from './Login';

const Home = () => {
  const session = useSelector(state => state.session);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (!user.name) {
    return <Login/>
  }

  if (session.id) {
    return <Navigate to={`/${session.id}`} />;
  }

  const handler = () => {
    dispatch(addError("Error!"));
  };

  const newSession = () => {
    sendMessage({
      type: "createSession"
    });
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <button onClick={newSession}>New Session</button>
      <button onClick={handler}>Add Error</button>
    </div>
  );
};

export default Home;
