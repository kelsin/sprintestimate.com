import { useState, useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Session = () => {
  const [copied, setCopied] = useState('');
  const params = useParams();
  const session = useSelector(state => state.session);

  if (!session.id) {
    return <Navigate to="/" />;
  }

  if (params.id !== session.id) {
    return <Navigate to={`/${session.id}`} />;
  }

  const url = `${window.location.origin}/${params.id}`;
  const copyURLHandler = () => {
    navigator.clipboard.writeText(url).then(() => setCopied(' - copied!'));
  };

  return (
    <div className="container">
      <h1>Session {params.id}</h1>
      <h5>🔗 <button type="button" className="btn btn-link" onClick={copyURLHandler}>{url}</button>{copied}</h5>
    </div>
  );
};

export default Session;
