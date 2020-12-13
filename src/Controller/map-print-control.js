import {addMapPrint} from '../View/add-screen.js';
import {lineInstance} from '../index.js';

export const loadMapPrint = () => {
  lineInstance.loadLine();
  addMapPrint(lineInstance.lines);
};
