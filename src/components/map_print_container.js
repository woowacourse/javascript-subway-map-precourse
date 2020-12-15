import { mapContainer } from '../templates/index.js';

export default function MapPrintContainer({ getLines }) {
  this.mainContainer = document.querySelector('.main-container');

  this.render = () => {
    const lines = getLines();
    this.mainContainer.innerHTML = mapContainer(lines);
  };
}
