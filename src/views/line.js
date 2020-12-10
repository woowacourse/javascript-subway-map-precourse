import Line from "../models/Line.js";
import Station from "../models/Station.js";

export default {
  init(element) {
    this.el = element;
    this.render();
    this.bindEvents();
  },

  query(selector) {
    return this.el.querySelector(selector);
  },

  render() {
    this.renderSelect();
    this.renderList();
  },

  renderSelect() {
    const content = Station.list().reduce((html, name) => html + `
      <option value="${name}">
        ${name}
      </option>
    `, '');
    this.query("#line-start-station-selector").innerHTML = content;
    this.query("#line-end-station-selector").innerHTML = content;
  },

  renderList() {
    const content = Line.list().reduce((html, line) => html + `
      <tr>
        <td>${line.name}</td>
        <td>${line.start}</td>
        <td>${line.end}</td>
        <td>
          <button>삭제</button>
        </td>
      </tr>
    `, '');
    this.query("tbody").innerHTML = content;
  },

  bindEvents() {
    this.query("#line-add-button").addEventListener('click', this.onClickAdd.bind(this));
  },

  onClickAdd() {
    const name = this.query("#line-name-input").value;
    const start = this.query("#line-start-station-selector").value;
    const end = this.query("#line-end-station-selector").value;

    if(!name || !start || !end || start === end) {
      return alert("올바른 입력이 아닙니다.");
    }

    try {
      Line.add(name, start, end);
    } catch (error) {
      alert(error.message);
    }

    this.clearForm();
    this.renderList();
  },

  clearForm() {
    this.query("#line-name-input").value = '';
    this.query("#line-start-station-selector").value = '';
    this.query("#line-end-station-selector").value = '';
  },
}
