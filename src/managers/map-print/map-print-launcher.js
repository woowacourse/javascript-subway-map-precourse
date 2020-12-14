import { getArrayFromLocalStorage } from '../../utils/util-local-storage.js';
import { appendNew, emptyElement } from '../../utils/util-ui.js';

// 4. 지하철 노선도 출력
export const launchMapPrintManager = (menu, container) => {
  emptyElement(container);
  printSubwayMap(menu, container);
};

const printSubwayMap = (menu, container) => {
  const lineList = getArrayFromLocalStorage('line');
  const subContainer = appendNew('div', container, '', `${menu}`);
  lineList.map((line) => printLine(subContainer, line));
};

const printLine = (subContainer, line) => {
  let ul;

  appendNew('h3', subContainer, line.name);
  ul = appendNew('ul', subContainer);
  line.stationList.map((stationName) => appendNew('li', ul, stationName));
};
