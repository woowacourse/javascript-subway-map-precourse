class InnerSectionInput {
  constructor($target, { lineName, stationStore, lineStore }) {
    this.$target = $target;
    this.lineName = lineName;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <p>구간 등록</p>
      <select id="section-station-selector">
      ${this.createOptionsHTML(this.stationStore.stations)}
      </select>
      <input type=number id="section-order-input" /><button id='section-add-button'>등록</button>    
    `;
  }

  createOptionsHTML(names) {
    return names.reduce((html, name) => {
      html += this.OptionHTML(name);
      return html;
    }, ``);
  }

  OptionHTML(name) {
    return `<option value=${name}>${name}</option>`;
  }

  bindEvents() {}

  render = () => {
    this.mountTemplate();
  };
}

export default InnerSectionInput;
