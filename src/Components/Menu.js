class Menu {
  constructor({ $target }) {
    this.$target = $target;

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <button id="station-manager-button">1. 역관리</button>
      <button id="line-manager-button">2. 노선 관리</button>
      <button id="section-manager-button">3. 구간 관리</button>
      <button id="map-print-manager-button">4. 지하철 노선도 출력</button>
    `;
  }

  bindEvents() {
    this.$target.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    console.log(target.id);
  }

  render = () => {
    this.mountTemplate();
  };
}

export default Menu;
