export const $screenButton = document.body.querySelectorAll('#app > button');

export const $stationContainer = document.body.querySelector('#station');
export const $stationTbody = $stationContainer.querySelector('table > tbody');
export const $stationAddInput = $stationContainer.querySelector(
  '#station-name-input',
);
export const $stationAddButton = $stationContainer.querySelector(
  '#station-add-button',
);

export const $lineContainer = document.body.querySelector('#line');
export const $lineTbody = $lineContainer.querySelector('table > tbody');
export const $upStreamSelector = $lineContainer.querySelector(
  '#line-start-station-selector',
);
export const $downStreamSelector = $lineContainer.querySelector(
  '#line-end-station-selector',
);
export const $lineAddButton = $lineContainer.querySelector('#line-add-button');
export const $lineNameInput = $lineContainer.querySelector('#line-name-input');

export const $sectionContainer = document.body.querySelector('#subway-section');
export const $sectionTbody = $sectionContainer.querySelector('table > tbody');
export const $sectionButtonContainer = $sectionContainer.querySelector(
  '#section-select-button',
);
export const $sectionEditContainer = $sectionContainer.querySelector(
  '#subway-section-edit',
);
export const $sectionAddButton = $sectionContainer.querySelector(
  '#section-add-button',
);
export const $sectionNumber = $sectionContainer.querySelector(
  '#section-order-input',
);
export const $sectionSelector = $sectionContainer.querySelector(
  '#section-station-selector',
);

export const $mapContainer = document.body.querySelector('#map-section');
