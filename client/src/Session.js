import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Session = () => {
  const params = useParams();
  const session = useSelector(state => state.session);

  if (!session.id) {
    return <Navigate to="/" />;
  }

  if (params.id !== session.id) {
    return <Navigate to={`/${session.id}`} />;
  }

  return (
    <div className="container">
      <h1>Session {params.id}</h1>
    </div>
  );
};

export default Session;
