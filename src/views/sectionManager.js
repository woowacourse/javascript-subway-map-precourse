import { makeElement, appendElements } from './utils.js';

export const showModifyLineBtn = subwayMap => {
  const buttonsDiv = document.querySelector('#buttons');
  const emptyDiv = makeElement({
    tag: 'div',
  });
  subwayMap.lineList.forEach(line => {
    const button = makeElement({
      tag: 'button',
      elementClass: 'section-line-menu-button',
      innerHTML: line.name,
      styles: 'margin: 0px 5px 0px 0px',
      dataName: 'line-name',
      dataValue: line.name,
    });
    appendElements([button], emptyDiv);
  });
  buttonsDiv.innerHTML = emptyDiv.outerHTML;
};

export const showSectionManager = (lineName, subwayMap) => {
  const sectionManagerDiv = document.querySelector('.section-manager');
  const sectionTitle = document.querySelector('#title');
  sectionManagerDiv.classList.add('active');
  showSectionStationSelector(subwayMap);
  sectionTitle.innerHTML = `${lineName} 관리`;
};

export const hideSectionManager = () => {
  const sectionManagerDiv = document.querySelector('.section-manager');
  sectionManagerDiv.classList.remove('active');
};

const showSectionStationSelector = subwayMap => {
  const sectionStationSelector = document.querySelector('#section-station-selector');
  let stationsHTML = '';
  subwayMap.stationList.forEach(name => {
    const stationOption = makeElement({
      tag: 'option',
      value: name,
      innerHTML: name,
    });
    stationsHTML += stationOption.outerHTML;
  });
  sectionStationSelector.innerHTML = stationsHTML;
};
