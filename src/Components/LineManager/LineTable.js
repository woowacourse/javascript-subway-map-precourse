import { MESSAGE } from "../../utils/constants/message.js";

class LineTable {
  constructor($target, { stationStore, lineStore }) {
    this.$target = $target;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.lineStore.subscribe(this.render);

    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <h3>🚉 지하철 노선 목록</h3>
      <table border="1">
        <tr>
          <th>노선 이름</th>
          <th>상행 종점역</th>
          <th>하행 종점역</th>
          <th>설정</th>
        </tr>
        ${this.createTableRowsHTML(this.lineStore.lines)}
      </table>
    `;
  }

  createTableRowsHTML(lines) {
    return lines.reduce((html, line) => {
      html += this.TableRowHTML([
        line.name,
        line.sections[0],
        line.sections[line.sections.length - 1],
      ]);
      return html;
    }, ``);
  }

  TableRowHTML(names) {
    const [name, startStation, endStation] = names;
    return `
    <tr>
      <td data-name=${name}>${name}</td>
      <td>${startStation}</td>
      <td>${endStation}</td>
      <td><button class="line-delete-button">노선에서 제거</button></td>
    </tr>
    `;
  }

  bindEvents() {
    this.$target.addEventListener(`click`, this.onClick.bind(this));
  }

  onClick({ target }) {
    if (!target.classList.contains(`line-delete-button`)) return;
    const name = target.closest(`tr`).firstElementChild.dataset.name;

    if (!confirm(MESSAGE.CONFIRM)) return;
    this.lineStore.removeLine(name);
    localStorage.setItem(`LINE`, JSON.stringify(this.lineStore.lines));
  }

  render = () => {
    this.mountTemplate();
  };
}

export default LineTable;
