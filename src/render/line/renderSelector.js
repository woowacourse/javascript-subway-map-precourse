function optionTemplate(station) {
  return `<option>${station}</option>`;
}

function addSelectorOption(selector) {
  const stations = JSON.parse(String(localStorage.getItem('stations')));
  const stationList = stations.split(' ');
  const selectOptions = stationList
    .map((station) => optionTemplate(station))
    .join('');

  selector.innerHTML = selectOptions;
}

export default function renderSelector() {
  const $lineStationSelector = document.querySelectorAll(
    '.station-input-container > div > select',
  );

  $lineStationSelector.forEach((selector) => addSelectorOption(selector));
}
