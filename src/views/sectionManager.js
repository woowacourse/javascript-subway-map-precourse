import { makeElement, appendElements } from './utils.js';
import { changeAddListener } from '../controllers/sectionManager.js';

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
  sectionTitle.innerHTML = `${lineName} 관리`;
  createInputBtn(subwayMap);
  showAddedSection(lineName, subwayMap);
  changeAddListener(lineName, subwayMap);
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

export const showAddedSection = (lineName, subwayMap) => {
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
      elementClass: 'section-delete-button',
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

const createInputBtn = subwayMap => {
  const sectionsRegistrationDiv = document.querySelector('#section-registration-div');
  const emptyDiv = makeElement({
    tag: 'div',
  });
  const stationSelect = makeElement({
    tag: 'select',
    id: 'section-station-selector',
  });
  const orderInput = makeElement({
    tag: 'input',
    type: 'number',
    id: 'section-order-input',
    placeholder: '순서',
  });
  const submitBtn = makeElement({
    tag: 'button',
    id: 'section-add-button',
    innerHTML: '등록',
  });
  appendElements([stationSelect, orderInput, submitBtn], emptyDiv);
  sectionsRegistrationDiv.innerHTML = emptyDiv.innerHTML;
  showSectionStationSelector(subwayMap);
};
