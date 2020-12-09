function sectionManagerPage() {
  return `<div hidden>Section Manger Page</div>`;
}

export default function initSectionManagerPage() {
  const $managementContainer = document.querySelector('.manager-container');

  $managementContainer.insertAdjacentHTML('beforeend', sectionManagerPage());
}
