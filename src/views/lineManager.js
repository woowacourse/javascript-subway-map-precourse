import { makeElement } from './utils.js';

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
