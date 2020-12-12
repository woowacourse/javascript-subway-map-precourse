import { mapContainer } from '../templates/index.js';

export default function MapPrintContainer({ lines }) {
  this.mainContainer = document.querySelector('.main-container');

  this.render = () => {
    this.mainContainer.innerHTML = mapContainer([]);
  };
}
