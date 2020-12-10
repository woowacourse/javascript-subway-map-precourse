import Line from "../models/Line.js";

export default {
  init(element) {
    this.el = element;
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    this.query('.buttons').addEventListener('click', this.onClickLineBtn.bind(this));
    this.query('tbody').addEventListener('click', this.onClickRemove.bind(this));
  },

  query(selector) {
    return this.el.querySelector(selector);
  },

  render() {
    const buttons = Line.list().reduce((html, line) => html + `
      <button data-name="${line.name}">${line.name}</button>
    `, '');

    this.query(".buttons").innerHTML = buttons;
  },

  renderLine(name) {
    const stations = Line.get(name).stations;
    const stationOptionsHTML = stations.reduce((html, station) => html + `
      <option value="${station}">${station}</option>
    `, '');
    const tbodyHTML = stations.reduce((html, station, idx) => html + `
      <tr>
        <td>${idx}</td>
        <td>${station}</td>
        <td>
          <button data-name="${station}">
            노선에서 제거
          </button>
        </td>
      </tr>
    `, '');

    this.query('.manage-section').style.display = 'block';
    this.query('.title').innerText = `${name} 관리`;
    this.query('#section-station-selector').innerHTML = stationOptionsHTML;
    this.query('tbody').innerHTML = tbodyHTML;
  },

  onClickLineBtn(e) {
    const name = e.target.dataset.name;
    this.renderLine(name);
  },

  onClickRemove(e) {
    const name = e.target.dataset.name;
    if (e.target.tagName !== 'BUTTON') return;
  }
}
