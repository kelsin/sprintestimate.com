import { useDispatch, useSelector } from 'react-redux';
import { removeError } from './store/errors';

const Errors = () => {
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  const closeError = i => {
    dispatch(removeError(i));
  };

  return (
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
  );
};

export default Errors;
