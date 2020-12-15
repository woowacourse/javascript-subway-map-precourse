import { ELEMENT_INFO } from "../util/constants.js";

export default function SectionList({ $target, stationsInSelectedLine }) {
  this.$container = document.createElement("section");
  $target.append(this.$container);

  this.stationsInSelectedLine = stationsInSelectedLine;

  const { sectionDeleteButton } = ELEMENT_INFO;

  this.bindOnDelete = () => {
    this.$container.addEventListener("click", (e) => {
      if (e.target.className === sectionDeleteButton.className) {
        console.log(this.isPossibleToDelete());
      }
    });
  };

  this.isPossibleToDelete = () => {
    return this.stationsInSelectedLine.length > 2 ? true : false;
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
