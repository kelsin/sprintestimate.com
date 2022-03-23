import { hslToHex } from './utils';

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

export const setUserPrefs = user => {
  userPrefs = user;
  window.localStorage.setItem('user', JSON.stringify(userPrefs));
}
