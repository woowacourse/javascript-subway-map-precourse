import { getArrayFromLocalStorage } from '../../utils/util-local-storage.js';
import { appendNew, emptyElement } from '../../utils/util-ui.js';

// 4. 지하철 노선도 출력
export const launchMapPrintManager = (menu, container) => {
  emptyElement(container);
  appendMap(menu, container);
};

const appendMap = (menu, container) => {
  const lineList = getArrayFromLocalStorage('line');
  const subContainer = appendNew('div', container, '', `${menu}`);
  
  lineList.map((line) => appendLine(subContainer, line));
};

const appendLine = (subContainer, line) => {
  let ul;

  appendNew('h3', subContainer, line.name);
  ul = appendNew('ul', subContainer);
  line.stationList.map((stationName) => appendNew('li', ul, stationName));
};
