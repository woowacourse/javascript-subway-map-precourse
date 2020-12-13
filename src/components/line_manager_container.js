import { lineAddContainer, lineList } from '../templates/index.js';

export default function LineManagerContainer({
  addLine,
  getLines,
  getStations,
}) {
  this.mainContainer = document.querySelector('.main-container');

  this.handleClickMainContainer = ({ target: { id } }) => {
    if (id === 'line-add-button') {
      this.addLine();
    }
  };

  this.addLine = () => {
    const name = document.getElementById('line-name-input').value;
    const start = document.getElementById('line-start-station-selector').value;
    const end = document.getElementById('line-end-station-selector').value;
    addLine({ name, start, end });
  };

  this.render = () => {
    const lines = getLines();
    const stations = getStations();
    this.mainContainer.innerHTML = lineAddContainer(stations) + lineList(lines);
  };

  this.mainContainer.addEventListener('click', this.handleClickMainContainer);
}
