import renderSelector from './line/renderSelector.js';
import renderStationList from './renderStationList.js';

function clearInputValue() {
  const $input = document.querySelectorAll('input');

  $input.forEach((input) => (input.value = ''));
}

export default function render() {
  clearInputValue();
  renderSelector();
  renderStationList();
}
