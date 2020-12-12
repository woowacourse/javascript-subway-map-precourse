import {
  sectionAddContainer,
  sectionMenuContainer,
  sectionTable,
} from '../templates/index.js';

export default function SectionManagerContainer({ lines }) {
  this.mainContainer = document.querySelector('.main-container');

  this.render = () => {
    this.mainContainer.innerHTML =
      sectionMenuContainer([]) + sectionAddContainer() + sectionTable([]);
  };
}
