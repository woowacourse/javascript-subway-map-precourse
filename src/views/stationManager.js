import { makeElement, appendElements } from './utils.js';

export const showAddedStation = subwayMap => {
  const stationTbody = document.querySelector('#station-manager-screen table tbody');
  let addedStations = '';
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
    addedStations += stationTr.outerHTML;
  });
  stationTbody.innerHTML = addedStations;
};

export const showNewStation = name => {
  const stationTbody = document.querySelector('#station-manager-screen table tbody');
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
    innerHTML: '삭제',
    dataName: 'station-name',
    dataValue: name,
  });
  appendElements([deleteBtn], btnTd);
  appendElements([nameTd, btnTd], stationTr);
  appendElements([stationTr], stationTbody);
};
