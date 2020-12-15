export const lineNameInputElement = document.getElementById('#line-name-input');
export const lineStartStationSelectorElement = document.getElementById(
  '#line-start-station-selector'
);
export const lineEndStationSelectorElement = document.getElementById(
  '#line-end-station-selector'
);
export const lineAddButtonElement = document.getElementById('#line-add-button');
export const lineDeleteButtons = document.querySelectorAll(
  '..line-delete-button'
);

export default {
  lineNameInputElement,
  lineStartStationSelectorElement,
  lineEndStationSelectorElement,
  lineAddButtonElement,
  lineDeleteButtons,
};
