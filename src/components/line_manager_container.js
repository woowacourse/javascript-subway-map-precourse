import { lineAddContainer, lineList } from '../templates/index.js';

export default function LineManagerContainer({ lines }) {
  this.mainContainer = document.querySelector('.main-container');

  this.render = () => {
    this.mainContainer.innerHTML = lineAddContainer() + lineList(lines);
  };
}
