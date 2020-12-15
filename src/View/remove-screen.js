import {
  $stationTbody,
  $lineTbody,
  $sectionEditButtonContainer,
  $mapContainer,
  $sectionTbody,
} from './element.js';

export const removeStationScreen = (button) => {
  const $stationTr = button.parentElement.parentElement;
  $stationTbody.removeChild($stationTr);
};

export const removeSelectorOption = ($stationSelector, stationName) => {
  const $stationSelectorOptions = $stationSelector.querySelectorAll('option');
  const removedStationOption = Array.from($stationSelectorOptions).find(
    (option) => option.value === stationName,
  );
  $stationSelector.removeChild(removedStationOption);
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

export const removeSectionScreen = (lineName) => {
  const $allSectionTr = $sectionTbody.querySelectorAll('tr');
  const $allDeletedSectionTr = Array.from($allSectionTr).filter(
    (tr) => tr.dataset.lineName === lineName,
  );

  for (let i = 0; i < $allDeletedSectionTr.length; i++) {
    $sectionTbody.removeChild($allDeletedSectionTr[i]);
  }
};

export const removeSectionButton = (lineName) => {
  const $sectionAllLineButton = $sectionEditButtonContainer.querySelectorAll(
    'button',
  );
  const $removedSectionButton = Array.from($sectionAllLineButton).find(
    (button) => button.textContent === lineName,
  );
  $sectionEditButtonContainer.removeChild($removedSectionButton);
};

export const removeMapPrint = (lineName) => {
  const $mapAllLines = $mapContainer.querySelectorAll('div');
  const $removedMapLine = Array.from($mapAllLines).find(
    (map) => map.dataset.lineName === lineName,
  );
  $mapContainer.removeChild($removedMapLine);
};

export const removeAllMapPrint = () => {
  while ($mapContainer.firstChild) {
    $mapContainer.removeChild($mapContainer.firstChild);
  }
};
