import { makeLineNameBtn } from './lineNameElemGenerator.js';
import { getLineName } from '../line/lineDataHandler.js';

export const loadLineName = () => {
  const lineNames = getLineName();
  makeLineNameBtn(lineNames);
};
