import { ELEMENT_INFO } from "../util/constants.js";

export default function StationList({ $target, stations }) {
  this.$container = document.createElement("section");
  $target.append(this.$container);

  this.stations = stations;

  const { stationDeleteButton } = ELEMENT_INFO;

  this.createTableRowHTMLString = (stationName) => {
    return `
      <tr>
        <td>${stationName}</td>
        <td><button class="${stationDeleteButton.className}">${stationDeleteButton.text}</button></td>
      </tr>
    `;
  };

  this.render = () => {
    this.$container.innerHTML = `
      <h2>🚉 지하철 역 목록</h2>
      <table>
        <thead>
          <tr>
            <th>역 이름</th>
            <th>설정</th>
          </tr>
        </thead>
        </tbody>
          ${this.stations.map((station) => this.createTableRowHTMLString(station)).join("")}
        </tbody>
      </table>
    `;
  };

  this.render();
}
