function stationManagerPage() {
  return `<div class="station-manager-page" hidden>Station Manger Page</div>`;
}

export default function initStationManagerPage() {
  const $managementContainer = document.querySelector('.manager-container');

  $managementContainer.insertAdjacentHTML('beforeend', stationManagerPage());
}
