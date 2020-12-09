function mapPrintManagerPage() {
  return `<div hidden>Map Print Manger Page</div>`;
}

export default function initMapPrintManagerPage() {
  const $managementContainer = document.querySelector('.management-container');

  $managementContainer.insertAdjacentHTML('beforeend', mapPrintManagerPage());
}
