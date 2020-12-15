import { ELEMENT_INFO } from "../util/constants.js";

export default function LineSelector({ $target, lines, onChangeLine }) {
  this.$container = document.createElement("section");
  this.$container.className = "line-selector";
  $target.append(this.$container);

  this.lines = lines;
  this.onChangeLine = onChangeLine;

  const { sectionLineMenuButton } = ELEMENT_INFO;

  this.bindOnClick = () => {
    this.$container.addEventListener("click", (e) => {
      if (e.target.className === sectionLineMenuButton.className) {
        this.onChangeLine(e.target.dataset.lineIndex);
      }
    });
  };

  this.createLineList = (line, index) => {
    return `<li><button data-line-index="${index}" class="${sectionLineMenuButton.className}">${line.name}</button></li>`;
  };

  this.render = () => {
    this.$container.innerHTML = `
      <h2>구간을 수정할 노선을 선택해주세요</h2>
      <ul>
        ${lines.map((line, index) => this.createLineList(line, index)).join("")}
      </ul>
    `;
  };

  this.render();
  this.bindOnClick();
}
