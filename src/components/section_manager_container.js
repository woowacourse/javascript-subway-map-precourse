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
      this.deleteSection(Number(item));
    }
  };

  this.addSection = () => {
    const lines = getLines();
    const targetLine = lines[this.selectedLineNumber];
    const stations = targetLine.stations;
    const station = document.getElementById('section-station-selector').value;
    const order = Number(document.getElementById('section-order-input').value);
    if (
      isValidSectionOrder(stations, order) &&
      isValidSection(stations, station)
    ) {
      addSection(this.selectedLineNumber, order, station);
    }
  };

  this.deleteSection = index => {
    const lines = getLines();
    const targetLine = lines[this.selectedLineNumber];
    const stations = targetLine.stations;
    if (isValidDeleteSection(stations)) {
      deleteSection(this.selectedLineNumber, index);
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
