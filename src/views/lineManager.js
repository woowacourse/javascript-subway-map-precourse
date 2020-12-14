import { makeElement, appendElements } from './utils.js';

export const showStationSelector = subwayMap => {
  const lineStartSelector = document.querySelector('#line-start-station-selector');
  const lineEndSelector = document.querySelector('#line-end-station-selector');
  let stationsHTML = '';
  subwayMap.stationList.forEach(name => {
    const stationOption = makeElement({
      tag: 'option',
      value: name,
      innerHTML: name,
    });
    stationsHTML += stationOption.outerHTML;
  });
  lineStartSelector.innerHTML = stationsHTML;
  lineEndSelector.innerHTML = stationsHTML;
};

export const showAddedLine = subwayMap => {
  const lineTbody = document.querySelector('#line-manager-screen table tbody');
  let addedLinesHTML = '';
  subwayMap.lineList.forEach(element => {
    const lineTr = makeElement({
      tag: 'tr',
    });
    const nameTd = makeElement({
      tag: 'td',
      innerHTML: element.name,
    });
    const startTd = makeElement({
      tag: 'td',
      innerHTML: element.list[0],
    });
    const endTd = makeElement({
      tag: 'td',
      innerHTML: element.list[element.list.length - 1],
    });
    const btnTd = makeElement({
      tag: 'td',
    });
    const deleteBtn = makeElement({
      tag: 'button',
      elementClass: 'line-delete-button',
      innerHTML: '삭제',
      dataName: 'line-name',
      dataValue: element.name,
    });
    appendElements([deleteBtn], btnTd);
    appendElements([nameTd, startTd, endTd, btnTd], lineTr);
    addedLinesHTML += lineTr.outerHTML;
  });
  lineTbody.innerHTML = addedLinesHTML;
};
