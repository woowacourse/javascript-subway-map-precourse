function setAttributeHiddenPages() {
  const $managerPages = document.querySelectorAll('.manager-container > div');
  const $sectionContainer = document.querySelectorAll('.section-container');

  $sectionContainer.forEach((container) =>
    container.setAttribute('hidden', true),
  );
  $managerPages.forEach((page) => page.setAttribute('hidden', true));
}

function changeManagerContainer({ target }) {
  setAttributeHiddenPages();
  if (target.id === 'station-manager-button') {
    document.querySelector('.station-manager-page').removeAttribute('hidden');
  }
  if (target.id === 'line-manager-button') {
    document.querySelector('.line-manager-page').removeAttribute('hidden');
  }
  if (target.id === 'section-manager-button') {
    document.querySelector('.section-manager-page').removeAttribute('hidden');
  }
  if (target.id === 'map-print-manager-button') {
    document.querySelector('.map-print-page').removeAttribute('hidden');
  }
}

export default function selectMenuButtonEvent() {
  const $menuButton = document.querySelector('.menu-button');

  $menuButton.addEventListener('click', changeManagerContainer);
}
