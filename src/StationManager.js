export default class StationManager {
  constructor({ target }) {
    this._target = target;
    this.createStationInput(target);
  }

  createStationInput(target) {
    const _container = document.createElement('div');
    target.appendChild(_container);

    _container.innerHTML = `  
      <p>역 이름</p>
      <input type="text" id="station-name-input" />
      <button id="station-add-button">역 추가</button>
    `;

    const _addButton = document.querySelector('#station-add-button');
    _addButton.addEventListener('click', this.onClickAddStation);
  }
}
