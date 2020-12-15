import { mapPrintWrapperElement } from '../elements/mapPrint.js';
import { getSubwayMapTemplate } from '../templates/list.js';
import { subwayMap } from '../store/store.js';

export const printMap = () => {
  mapPrintWrapperElement.innerHTML = getSubwayMapTemplate(subwayMap.allLines);
};

export default {
  printMap,
};
