import Line from "../models/Line.js";
import Station from "../models/Station.js";

export default {
  init(element) {
    this.el = element;
    this.render();
    this.bindEvents();
  },

  bindEvents() {
    this.query(".buttons").addEventListener(
      "click",
      this.onClickLineBtn.bind(this)
    );
    this.query("tbody").addEventListener(
      "click",
      this.onClickRemove.bind(this)
    );
    this.query("#section-add-button").addEventListener(
      "click",
      this.onClickAddStationToLine.bind(this)
    );
  },

  query(selector) {
    return this.el.querySelector(selector);
  },

  render() {
    const buttons = Line.list().reduce(
      (html, line) =>
        html +
        `
      <button data-name="${line.name}">${line.name}</button>
    `,
      ""
    );

    this.query(".buttons").innerHTML = buttons;
  },

  renderLine(name) {
    const stations = Station.list();
    const stationsOfLine = Line.get(name).stations;
    const stationOptionsHTML = stations.reduce(
      (html, station) =>
        html +
        `
      <option value="${station}">${station}</option>
    `,
      ""
    );
    const tbodyHTML = stationsOfLine.reduce(
      (html, station, idx) =>
        html +
        `
      <tr>
        <td>${idx}</td>
        <td>${station}</td>
        <td>
          <button data-name="${station}">
            노선에서 제거
          </button>
        </td>
      </tr>
    `,
      ""
    );
    this.currentLineName = name;

    this.query(".manage-section").style.display = "block";
    this.query(".title").innerText = `${name} 관리`;
    this.query("#section-station-selector").innerHTML = stationOptionsHTML;
    this.query("tbody").innerHTML = tbodyHTML;
    this.query("#section-order-input").min = 0;
    this.query("#section-order-input").max = stationsOfLine.length;
    this.clearForm();
  },

  onClickLineBtn(e) {
    const name = e.target.dataset.name;
    this.renderLine(name);
  },

  onClickAddStationToLine() {
    const line = Line.get(this.currentLineName);
    const station = this.query("#section-station-selector").value;
    const idx = this.query("#section-order-input").value;

    if (idx <= -1) {
      return alert("최소값은 0입니다.");
    }

    if (idx > line.stations.length) {
      return alert("올바르지 못한 입력입니다.");
    }

    if (line.stations.some(s => s === station)) {
      return alert("이미 등록된 역입니다.");
    }

    line.addSectionTo(station, idx);
    this.renderLine(this.currentLineName);
  },

  onClickRemove(e) {
    const lineName = this.currentLineName;
    const station = e.target.dataset.name;
    if (e.target.tagName !== "BUTTON") return;

    if (!confirm("정말로 노선에서 제거할까요?")) return;

    if (Line.get(lineName).stations.length === 2) {
      return alert("노선에는 최소 2개의 역이 필요합니다.");
    }

    Line.get(lineName).removeSection(station);
    this.renderLine(lineName);
  },

  clearForm() {
    this.query("#section-order-input").value = 0;
  },
};
