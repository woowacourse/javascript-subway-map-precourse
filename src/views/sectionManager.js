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
  showAddedSection(lineName, subwayMap);
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

const showAddedSection = (lineName, subwayMap) => {
  const lineList = subwayMap.lineList;
  const sectionTbody = document.querySelector('.section-manager table tbody');
  const sectionIndex = lineList.findIndex(line => line.name === lineName);
  const selectedSectionList = lineList[sectionIndex].list;
  let addedSectionsHTML = '';
  for (let i = 0; i < selectedSectionList.length; ++i) {
    const sectionTr = makeElement({
      tag: 'tr',
    });
    const orderTd = makeElement({
      tag: 'td',
      innerHTML: String(i),
    });
    const nameTd = makeElement({
      tag: 'td',
      innerHTML: selectedSectionList[i],
    });
    const btnTd = makeElement({
      tag: 'td',
    });
    const deleteBtn = makeElement({
      tag: 'button',
      elementClass: 'station-delete-button',
      innerHTML: '노선에서 제거',
      dataName: 'station-name',
      dataValue: selectedSectionList[i],
    });
    appendElements([deleteBtn], btnTd);
    appendElements([orderTd, nameTd, btnTd], sectionTr);
    addedSectionsHTML += sectionTr.outerHTML;
  }
  sectionTbody.innerHTML = addedSectionsHTML;
};
