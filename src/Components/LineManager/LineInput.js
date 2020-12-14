class LineInput {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>노선 이름</p>
      <Input id="line-name-input" placeholder="노선 이름을 입력해주세요."/>
      <div>
        <span>상행 종점</span>
        <select id ="line-start-station-selector">
        ${this.createOptionsHTML(this.stationStore.stations)}
        </select>
        </div>
        <div>
        <span>하행 종점</span>
        <select id ="line-end-station-selector">
        ${this.createOptionsHTML(this.stationStore.stations)}
        </select>
      </div>
      <button id="line-add-button">노선 추가</button>
    `;
  }

  createOptionsHTML(stations) {
    return stations.reduce((html, station) => {
      html += this.OptionHTML(station);
      return html;
    }, ``);
  }

  OptionHTML(name) {
    return `
      <option value=${name}>${name}</option>
    `;
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#line-name-input`);
    this.$startSelect = this.$target.querySelector(
      `#line-start-station-selector`,
    );
    this.$endSelect = this.$target.querySelector(`#line-end-station-selector`);
    this.$button = this.$target.querySelector(`#line-add-button`);
  }

  bindEvents() {}

  render = () => {
    this.mountTemplate();
    this.mountDOMs();
  };
}

export default LineInput;
