import renderSectionContainer from '../../render/section/renderSectionContainer.js';

export default function updateSectionList(lineNumber) {
  renderSectionContainer();

  const $sectionContainer = document.querySelectorAll('.section-container');
  $sectionContainer.forEach((container) => {
    if (container.dataset.number === lineNumber) {
      container.removeAttribute('hidden');
    }
  });
}
