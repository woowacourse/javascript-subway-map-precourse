function optionTemplate(station) {
  return `<option>${station}</option>`;
}

function addSelectorOption(selector) {
  const stations = JSON.parse(String(localStorage.getItem('stations')));

  if (stations === null) {
    return (selector.innerHTML = `<option>역을 먼저 추가해주세요.</option>`);
  }

  const stationList = stations.split(' ');
  const selectOptions = stationList
    .map((station) => optionTemplate(station))
    .join('');

  return (selector.innerHTML = selectOptions);
}

export default function renderSelector() {
  const $lineStationSelector = document.querySelectorAll('select');

  $lineStationSelector.forEach((selector) => addSelectorOption(selector));
}
