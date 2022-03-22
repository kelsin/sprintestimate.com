import { configureStore } from '@reduxjs/toolkit';
import errors from './errors';
import session from './session';
import user from './user';

import { hslToHex } from '../utils';

const randomColor = hslToHex(Math.floor(Math.random() * 361), 100, 50);
const defaultPrefs = {
  name: '',
  color: randomColor
};

let userPrefs;
try {
  userPrefs = JSON.parse(window.localStorage.getItem('user')) || defaultPrefs;
} catch {
  userPrefs = defaultPrefs;
}

export default configureStore({
  reducer: { errors, session, user },
  preloadedState: { user: userPrefs }
});
