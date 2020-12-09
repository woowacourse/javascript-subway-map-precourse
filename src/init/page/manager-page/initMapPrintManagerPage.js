function mapPrintManagerPage() {
  return `<div hidden>Map Print Manger Page</div>`;
}

export default function initMapPrintManagerPage() {
  const $managementContainer = document.querySelector('.manager-container');

  $managementContainer.insertAdjacentHTML('beforeend', mapPrintManagerPage());
}
