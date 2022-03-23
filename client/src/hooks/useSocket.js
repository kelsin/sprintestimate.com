import { useContext } from "react";
import { Context } from "../Socket";

const useSocket = () => {
  return useContext(Context);
};

export default useSocket;
