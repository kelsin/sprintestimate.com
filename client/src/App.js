import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Errors from './Errors';
import Home from './Home';
import Nav from './Nav';
import Session from './Session';
import User from './User';

import { sendMessage } from './ws';

function App() {
  const user = useSelector(state => state.user);

  // useEffect(() => {
  //   if(!user.id) {
  //     sendMessage({type:"login", ...user});
  //   }
  // }, [user]);

  return (
    <div>
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
