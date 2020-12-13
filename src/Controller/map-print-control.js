import {addMapPrint} from '../View/add-screen.js';
import {removeMapPrint} from '../View/remove-screen.js';
import {lineInstance} from '../index.js';

export const loadMapPrint = () => {
  removeMapPrint();
  lineInstance.loadLine();
  addMapPrint(lineInstance.lines);
};
