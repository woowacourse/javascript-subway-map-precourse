import renderSectionContainer from '../../render/section/renderSectionContainer.js';
import addSectionEvent from './addSectionEvent.js';
import removeSectionEvent from './removeSectionEvent.js';

export default function updateSectionList(lineNumber) {
  renderSectionContainer();

  const $sectionContainer = document.querySelectorAll('.section-container');
  $sectionContainer.forEach((container) => {
    if (container.dataset.number === lineNumber) {
      container.removeAttribute('hidden');
    }
  });
  addSectionEvent();
  removeSectionEvent();
}
