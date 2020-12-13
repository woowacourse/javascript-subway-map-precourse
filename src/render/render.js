import renderStationList from './station/renderStationList.js';
import renderSelector from './common/renderSelector.js';
import renderLineList from './line/renderLineList.js';
import renderLineSelector from './section/renderLineSelect.js';
import renderSectionContainer from './section/renderSectionContainer.js';
import renderSubwayMap from './station-map/renderSubwayMap.js';

function clearInputValue() {
  const $input = document.querySelectorAll('input');

  $input.forEach((input) => (input.value = ''));
}

export default function render() {
  clearInputValue();
  renderSelector();

  renderStationList();
  renderLineList();

  renderLineSelector();
  renderSectionContainer();

  renderSubwayMap();
}
