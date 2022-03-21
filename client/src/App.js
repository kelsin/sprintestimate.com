import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeError } from './store/errors';

import Home from './Home';
import Session from './Session';

function App() {
  const errors = useSelector(state => state.errors);
  const user = useSelector(state => state.user);
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();
  const closeError = i => {
    dispatch(removeError(i));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-branch" to="/">Sprint Estimate</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              { session && (
                <li className="nav-item">
                  <Link className="nav-link active" to={`/${session.id}`}>{session.id}</Link>
                </li>
              ) }
            </ul>
          </div>
          { user && (
            <div className="d-flex">
              {user.name}
              <div className="ms-3" style={{height:"24px", width:"24px", backgroundColor: user.color}}/>
            </div>
          ) }
        </div>
      </nav>
      <div className="errors container pt-3">
        { errors.map((error, i) => (
          <div className="row" key={`error-${i}`}>
            <div className="col">
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button"
                        className="btn-close"
                        onClick={() => closeError(i)}
                        aria-label="Close"></button>
              </div>
            </div>
          </div>
        )) }
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Session />} />
      </Routes>
    </div>
  );
}

export default App;
