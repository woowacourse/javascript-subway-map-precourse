const sectionStationSelector = document.querySelector('#section-station-selector');
const sectionNameInput = document.querySelector('#section-order-input');
const sectionAddBtn = document.querySelector('#section-add-button');

export const sectionAddListener = subwayMap => {
  sectionAddBtn.addEventListener('click', () => console.log(sectionNameInput.value, subwayMap));
  sectionNameInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      console.log(sectionNameInput.value, subwayMap);
    }
  });
};
