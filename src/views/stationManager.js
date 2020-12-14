import { makeElement, appendElements } from './utils.js';

export const showAddedStation = subwayMap => {
  const stationTbody = document.querySelector('#station-manager-screen table tbody');
  let addedStationsHTML = '';
  subwayMap.stationList.forEach(name => {
    const stationTr = makeElement({
      tag: 'tr',
    });
    const nameTd = makeElement({
      tag: 'td',
      innerHTML: name,
    });
    const btnTd = makeElement({
      tag: 'td',
    });
    const deleteBtn = makeElement({
      tag: 'button',
      elementClass: 'station-delete-button',
      innerHTML: '삭제',
      dataName: 'station-name',
      dataValue: name,
    });
    appendElements([deleteBtn], btnTd);
    appendElements([nameTd, btnTd], stationTr);
    addedStationsHTML += stationTr.outerHTML;
  });
  stationTbody.innerHTML = addedStationsHTML;
};
