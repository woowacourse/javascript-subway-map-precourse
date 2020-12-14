export default class StationManager {
  constructor({ target, addStation }) {
    this._target = target;
    this.onClickAddStation = addStation;
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

  setSubway(subway) {
    this._subway = subway;
    this.render();
  }

  render() {
    console.log(this._subway.getStationName());
  }
}
