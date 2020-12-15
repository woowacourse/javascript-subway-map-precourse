import {getList} from '../util/storageAccess.js';
import {LINE, TEMPLATE} from '../constants.js';
import {clearHTML} from './init-ui.js';

export function createMap() {
  clearHTML(TEMPLATE.MAP);

  const map = document.createElement('div');
  map.className = 'map';

  const lineList = getList(LINE.LISTNAME);
  for (let i=0; i<lineList.length; i++) {
    map.appendChild(createLineTitle(lineList[i]));
    map.appendChild(createLineList(lineList[i]));
  }
  TEMPLATE.MAP.append(map);
}

function createLineTitle(lineName) {
  const title = document.createElement('h3');
  title.innerText = lineName;
  return title;
}

function createLineList(lineName) {
  const stationList = getList(lineName);
  const list = document.createElement('ul');
  for (let i=0; i<stationList.length; i++) {
    const tmp = document.createElement('li');
    tmp.append(stationList[i]);
    list.appendChild(tmp);
  }
  return list;
}
