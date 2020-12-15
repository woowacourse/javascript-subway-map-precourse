import { ELEMENT_INFO } from "../util/constants.js";

export default function StationList({ $target, stations, onDeleteStation }) {
  this.$container = document.createElement("section");
  $target.append(this.$container);

  this.stations = stations;
  this.onDeleteStation = onDeleteStation;

  const { stationDeleteButton } = ELEMENT_INFO;

  this.bindOnDelete = () => {
    this.$container.addEventListener("click", (e) => {
      if (e.target.className === stationDeleteButton.className) {
        this.onDeleteStation(e.target.dataset.stationIndex);
      }
    });
  };

  this.setState = ({ nextStations }) => {
    this.stations = nextStations;
    this.render();
  };

  this.createTableRowHTMLString = (stationName, index) => {
    return `
      <tr>
        <td>${stationName}</td>
        <td><button class="${stationDeleteButton.className}" data-station-index="${index}">${stationDeleteButton.text}</button></td>
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
          ${this.stations.map((station, index) => this.createTableRowHTMLString(station, index)).join("")}
        </tbody>
      </table>
    `;
  };

  this.render();
  this.bindOnDelete();
}
