import {
  sectionAddContainer,
  sectionMenuContainer,
  sectionTable,
} from '../templates/index.js';
import {
  isValidSectionOrder,
  isValidSection,
  isValidDeleteSection,
} from '../utils/index.js';
import { CONFIRM_MESSAGE } from '../constants/index.js';
import { Station } from '../models/index.js';

export default function SectionManagerContainer({
  getLines,
  getStations,
  addSection,
  deleteSection,
}) {
  this.mainContainer = document.querySelector('.main-container');

  this.handleClickMainContainer = ({
    target: {
      className,
      dataset: { item },
      id,
    },
  }) => {
    if (className === 'section-line-menu-button') {
      this.selectedLineNumber = Number(item);
      this.renderTable(this.selectedLineNumber);
    }

    if (id === 'section-add-button') {
      this.addSection();
    }

    if (className === 'section-delete-button') {
      this.deleteSection(item);
    }
  };

  this.addSection = () => {
    const lines = getLines();
    const targetLine = lines[this.selectedLineNumber];
    const stations = targetLine.stations;
    const stationName = document.getElementById('section-station-selector')
      .value;
    const order = Number(document.getElementById('section-order-input').value);
    if (
      isValidSectionOrder(stations, order) &&
      isValidSection(stations, stationName)
    ) {
      addSection(this.selectedLineNumber, new Station(stationName), order);
    }
  };

  this.deleteSection = name => {
    const lines = getLines();
    const targetLine = lines[this.selectedLineNumber];
    const stations = targetLine.stations;
    if (confirm(CONFIRM_MESSAGE) && isValidDeleteSection(stations)) {
      deleteSection(this.selectedLineNumber, name);
    }
  };

  this.render = () => {
    const lines = getLines();
    this.mainContainer.innerHTML = sectionMenuContainer(lines);
  };

  this.renderTable = () => {
    const lines = getLines();
    const stations = getStations();
    const targetLine = lines[this.selectedLineNumber];
    this.mainContainer.innerHTML =
      sectionMenuContainer(lines) +
      sectionAddContainer(targetLine.name, stations) +
      sectionTable(targetLine.stations);
  };

  this.mainContainer.addEventListener('click', this.handleClickMainContainer);
}
