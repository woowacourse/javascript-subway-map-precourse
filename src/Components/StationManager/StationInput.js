class StationInput {
  constructor($target, { stationStore }) {
    this.$target = $target;
    this.stationStore = stationStore;

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>역 이름</p>
      <Input id="station-name-input" placeholder="역 이름을 입력해주세요." />
      <button id="station-add-button">역 추가</button>
    `;
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#station-name-input`);
    this.$button = this.$target.querySelector(`#station-add-button`);
  }

  bindEvents() {
    this.$button.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (target.id !== `station-add-button`) return;

    console.log(this.$input.value);
  }

  render = () => {
    this.mountTemplate();
    this.mountDOMs();
  };
}

export default StationInput;
