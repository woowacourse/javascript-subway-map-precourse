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

  this.handleClickMainContainer = ({ target: { className, dataset, id } }) => {
    this.selectLineEvent({ className, dataset });
    this.sectionEvent({ id, className, dataset });
  };

  this.selectLineEvent = ({ className, dataset: { item } }) => {
    if (className === 'section-line-menu-button') {
      this.selectedLine = item;
      this.renderTable();
    }
  };

  this.sectionEvent = ({ id, className, dataset: { item } }) => {
    if (id === 'section-add-button') {
      this.addSection();
    }

    if (className === 'section-delete-button') {
      this.deleteSection(item);
    }
  };

  this.addSection = () => {
    const lines = getLines();
    const { stations } = lines.find(line => line.name === this.selectedLine);
    const stationName = document.getElementById('section-station-selector')
      .value;
    const order = Number(document.getElementById('section-order-input').value);
    if (
      isValidSectionOrder(stations, order) &&
      isValidSection(stations, stationName)
    ) {
      const lineIndex = lines.findIndex(
        line => line.name === this.selectedLine
      );
      addSection(lineIndex, new Station(stationName), order);
      this.renderTable(lineIndex);
    }
  };

  this.deleteSection = name => {
    const lines = getLines();
    const { stations } = lines.find(line => line.name === this.selectedLine);
    const lineIndex = lines.findIndex(line => line.name === this.selectedLine);
    if (confirm(CONFIRM_MESSAGE) && isValidDeleteSection(stations)) {
      deleteSection(lineIndex, name);
      this.renderTable();
    }
  };

  this.render = () => {
    const lines = getLines();
    this.mainContainer.innerHTML = sectionMenuContainer(lines);
  };

  this.renderTable = () => {
    const lines = getLines();
    const stations = getStations();
    const targetLine = lines.find(line => line.name === this.selectedLine);
    this.mainContainer.innerHTML =
      sectionMenuContainer(lines) +
      sectionAddContainer(targetLine.name, stations) +
      sectionTable(targetLine.stations);
  };

  this.mainContainer.addEventListener('click', this.handleClickMainContainer);
}
