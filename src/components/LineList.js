import { ELEMENT_INFO } from "../util/constants.js";

export default function LineList({ $target, lines, onDeleteLine }) {
  const { lineDeleteButton } = ELEMENT_INFO;

  this.$container = document.createElement("section");
  $target.append(this.$container);

  this.lines = lines;
  this.onDeleteLine = onDeleteLine;

  this.bindOnDelete = () => {
    this.$container.addEventListener("click", (e) => {
      if (e.target.className === lineDeleteButton.className) {
        this.onDeleteLine(e.target.dataset.lineIndex);
      }
    });
  };

  this.setState = ({ nextLines }) => {
    this.lines = nextLines;
    this.render();
  };

  this.createTableRowHTMLString = (line, index) => {
    return `
      <tr>
        <td>${line.name}</td>
        <td>${line.stations[0]}</td>
        <td>${line.stations[line.stations.length - 1]}</td>
        <td>
          <button data-line-index="${index}" class="${lineDeleteButton.className}">${lineDeleteButton.text}</button>
        </td>
      </tr>
    `;
  };

  this.render = () => {
    this.$container.innerHTML = `
      <h2>🚉 지하철 노선 목록</h2>
      <table>
        <thead>
          <tr>
            <th>노선 이름</th>
            <th>상행 종점역</th>
            <th>하행 종점역</th>
            <th>설정</th>
          </tr>
        </thead>
        </tbody>
          ${this.lines.map((line, index) => this.createTableRowHTMLString(line, index)).join("")}
        </tbody>
      </table>
    `;
  };

  this.render();
  this.bindOnDelete();
}
