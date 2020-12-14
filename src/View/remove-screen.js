import {
  $stationTbody,
  $lineTbody,
  $sectionButtonContainer,
  $mapContainer,
} from './element.js';

export const removeStationScreen = (button) => {
  const $stationTr = button.parentElement.parentElement;
  $stationTbody.removeChild($stationTr);
};

export const removeStationSelectOption = ($stationSelect, station) => {
  const $stationSelectOptions = $stationSelect.querySelectorAll('option');
  const removedStationOption = Array.from($stationSelectOptions).find(
    (option) => option.value === station,
  );
  $stationSelect.removeChild(removedStationOption);
};

export const removeLineScreen = (button) => {
  const $lineTr = button.parentElement.parentElement;
  $lineTbody.removeChild($lineTr);
};

export const removeTableScreen = ($container) => {
  const $tbody = $container.querySelector('table > tbody');
  const $tr = $container.querySelectorAll('tr');
  for (let i = 1; i < $tr.length; i++) {
    $tbody.removeChild($tr[i]);
  }
};

export const removeSectionButton = (line) => {
  const $sectionAllLineButton = $sectionButtonContainer.querySelectorAll(
    'button',
  );
  const $removedSectionButton = Array.from($sectionAllLineButton).find(
    (button) => button.textContent === line,
  );
  $sectionButtonContainer.removeChild($removedSectionButton);
};

export const removeOption = ($select) => {
  while ($select.firstChild) {
    $select.removeChild($select.firstChild);
  }
};

export const removeMapPrint = (line) => {
  const $mapAllLines = $mapContainer.querySelectorAll('div');
  const $removedMapLine = Array.from($mapAllLines).find(
    (map) => map.dataset.line === line,
  );
  $mapContainer.removeChild($removedMapLine);
};

export const removeAllMapPrint = () => {
  while ($mapContainer.firstChild) {
    $mapContainer.removeChild($mapContainer.firstChild);
  }
};
