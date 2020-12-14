import { lineAddContainer, lineList } from '../templates/index.js';
import { isValidLine, isValidLineName } from '../utils/index.js';
import { CONFIRM_MESSAGE } from '../constants/index.js';
import Station from '../station.js';

export default function LineManagerContainer({
  addLine,
  deleteLine,
  getLines,
  getStations,
}) {
  this.mainContainer = document.querySelector('.main-container');

  this.handleClickMainContainer = ({
    target: {
      id,
      className,
      dataset: { item },
    },
  }) => {
    if (id === 'line-add-button') {
      this.addLine();
    }

    if (className === 'line-delete-button') {
      this.deleteLine(item);
    }
  };

  this.addLine = () => {
    const name = document
      .getElementById('line-name-input')
      .value.trim('')
      .replace(/\s{2,}/g, ' ');
    const start = document.getElementById('line-start-station-selector').value;
    const end = document.getElementById('line-end-station-selector').value;
    const lines = getLines();
    if (isValidLineName(lines, name) && isValidLine(start, end)) {
      addLine(name, [new Station(start), new Station(end)]);
    }
  };

  this.deleteLine = index => {
    if (confirm(CONFIRM_MESSAGE)) {
      deleteLine(Number(index));
    }
  };

  this.render = () => {
    const lines = getLines();
    const stations = getStations();
    this.mainContainer.innerHTML = lineAddContainer(stations) + lineList(lines);
  };

  this.mainContainer.addEventListener('click', this.handleClickMainContainer);
}
