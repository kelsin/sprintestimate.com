import { useContext } from 'react';
import { Context } from '../Socket';

const useSocket = () => {
  const ctx = useContext(Context);

  return [ctx.send, ctx.ws];
};

export default useSocket;
