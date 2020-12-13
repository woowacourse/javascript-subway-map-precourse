import { overTwo, notDuplicate } from '../controllers/validation.js';

export const addStation = (name, list) => {
  if (overTwo(name) && notDuplicate(name, list)) {
    console.log(name, list);
  }
};
