import { useDispatch, useSelector } from 'react-redux';

import { hslToHex } from '../utils';
import { setUser } from '../store/user';
import useLocalState from './useLocalState';

const randomColor = hslToHex(Math.floor(Math.random() * 361), 100, 50);
const defaultUser = {
  name: '',
  color: randomColor
};

const useUser = () => {
  const [localUser, setLocalUser] = useLocalState('user', defaultUser);
  const storeUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const user = storeUser.name ? storeUser : localUser;

  const updateUser = updatedUser => {
    const newUser = {...user, ...updatedUser};
    setLocalUser(newUser);
    dispatch(setUser(newUser));
  };

  return [user, updateUser];
};

export default useUser;
