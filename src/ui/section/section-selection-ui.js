import {SECTION, LINE} from '../../constants.js';
import {openLineManagement} from './section-management-ui.js';
import {clearHTML} from '../init-ui.js';
import {getList} from '../../util/storageAccess.js';

export function resetLineButtons() {
  clearHTML(SECTION.SELECTION_LIST);
  const lineList = getList(LINE.LISTNAME);
  for (let i=0; i<lineList.length; i++) {
    addLineButton(lineList[i]);
  }
}

function addLineButton(lineName) {
  SECTION.SELECTION_LIST.appendChild(createLineButton(lineName));
}

function createLineButton(lineName) {
  const lineButton = document.createElement('button');
  lineButton.className = SECTION.SELECTION_CLASS_NAME;
  lineButton.innerText = lineName;
  lineButton.addEventListener('click', () => {
    openLineManagement(lineName);
  });

  return lineButton;
}
