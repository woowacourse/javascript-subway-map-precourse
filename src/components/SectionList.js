import { ELEMENT_INFO, ERROR_MESSAGE } from "../util/constants.js";

export default function SectionList({ $target, stationsInSelectedLine, onDeleteSection }) {
  this.$container = document.createElement("section");
  $target.append(this.$container);

  this.stationsInSelectedLine = stationsInSelectedLine;
  this.onDeleteSection = onDeleteSection;

  const { sectionDeleteButton } = ELEMENT_INFO;

  this.bindOnDelete = () => {
    this.$container.addEventListener("click", (e) => {
      if (e.target.className === sectionDeleteButton.className && this.isPossibleToDelete()) {
        this.onDeleteSection(e.target.dataset.stationIndex);
      }
    });
  };

  this.isPossibleToDelete = () => {
    const result = this.stationsInSelectedLine.length > 2 ? true : false;

    if (!result) {
      alert(ERROR_MESSAGE.notPossibleToDeleteSection);
    }

    return result;
  };

  this.setState = (nextStationsInSelectedLine) => {
    this.stationsInSelectedLine = nextStationsInSelectedLine;

    this.render();
  };

  this.createTableRowHTMLString = (stationName, index) => {
    return `
      <tr>
        <td>${index}</td>
        <td>${stationName}</td>
        <td><button class="${sectionDeleteButton.className}" data-station-index="${index}">${sectionDeleteButton.text}</button></td>
      </tr>
    `;
  };

  this.render = () => {
    this.$container.innerHTML =
      this.stationsInSelectedLine.length > 0
        ? `<table>
            <thead>
              <tr>
                <th>순서</th>
                <th>이름</th>
                <th>설정</th>
              </tr>
            </thead>
            <tbody>
              ${this.stationsInSelectedLine
                .map((stationName, index) => this.createTableRowHTMLString(stationName, index))
                .join("")}
            </tbody>
          </table>`
        : "";
  };

  this.render();
  this.bindOnDelete();
}
