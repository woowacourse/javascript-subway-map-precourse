import renderLineList from './line/renderLineList.js';
import renderSelector from './line/renderSelector.js';
import renderLineSelector from './section/renderLineSelect.js';
import renderSubwayMap from './station-map/renderSubwayMap.js';
import renderStationList from './station/renderStationList.js';

function clearInputValue() {
  const $input = document.querySelectorAll('input');

  $input.forEach((input) => (input.value = ''));
}

export default function render() {
  clearInputValue();
  renderStationList();

  renderSelector();
  renderLineList();

  renderLineSelector();

  renderSubwayMap();
}
