class Menu {
  constructor({ $target, changeMenu }) {
    this.$target = $target;
    this.changeMenu = changeMenu;

    this.buttonsId = [
      "station-manager-button",
      "line-manager-button",
      "section-manager-button",
      "map-print-manager-button",
    ];

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
    if (!this.buttonsId.includes(target.id)) return;

    this.changeMenu(target.id);
  }

  render = () => {
    this.mountTemplate();
  };
}

export default Menu;
