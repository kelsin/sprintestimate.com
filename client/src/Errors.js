import { useDispatch, useSelector } from "react-redux";
import { removeError } from "./store/errors";

const Errors = () => {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const closeError = (i) => {
    dispatch(removeError(i));
  };

  return (
    <div className="errors">
      {errors.map((error, i) => (
        <div className="error" key={`error-${i}`} onClick={() => closeError(i)}>
          {error}
        </div>
      ))}
    </div>
  );
};

export default Errors;
