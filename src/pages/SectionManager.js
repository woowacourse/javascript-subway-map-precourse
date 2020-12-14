import Component from "../core/Component.js";
import { ERROR } from "../utils/errors.js";

const elementMap = {
  sectionLineMenuButton: "section-line-menu-button",
  sectionStationSelector: "section-station-selector",
  sectionOrderInput: "section-order-input",
  sectionAddButton: "section-add-button",
  sectionDeleteButton: "section-delete-button",
};
export default class SectionManager extends Component {
  constructor() {
    super();
    this.state = {
      selectedLine: null,
    };

    this.handleLineButtonClick = (index) => {
      this.setState({ selectedLine: index });
    };

    this.handleAddButtonClick = (order, station) => {
      const { selectedLine } = this.state;
      if (order.length === 0) {
        alert(ERROR.RE_TYPING_ORDER);
        return;
      }
      this.store.lines[selectedLine].stations.splice(order, 0, station);
      this.setStore(cloneDeep(this.store));
    };

    this.handleDeleteButtonClick = (index) => {
      const stations = this.store.lines[this.state.selectedLine].stations;
      if (isLessThanTwoStation(stations)) {
        stations.splice(index, 1);
        this.setStore(cloneDeep(this.store));
      } else {
        alert(ERROR.NOT_DELETE);
      }
    };
  }

  mount() {
    const sectionStationSelector = document.getElementById(
      elementMap.sectionStationSelector
    );
    const sectionOrderInput = document.getElementById(
      elementMap.sectionOrderInput
    );
    this.mountLineMenuButton();
    this.mountAddButton(sectionOrderInput, sectionStationSelector);
    this.mountDeleteButton();
  }

  mountLineMenuButton() {
    const sectionLineMenuButtons = document.getElementsByClassName(
      elementMap.sectionLineMenuButton
    );
    [...sectionLineMenuButtons].forEach((button, index) => {
      button.addEventListener("click", () => {
        this.handleLineButtonClick(index);
      });
    });
  }

  mountAddButton(sectionOrderInput, sectionStationSelector) {
    const sectionAddButton = document.getElementById(
      elementMap.sectionAddButton
    );
    sectionAddButton?.addEventListener("click", () => {
      this.handleAddButtonClick(
        sectionOrderInput.value,
        sectionStationSelector.value
      );
    });
  }

  mountDeleteButton() {
    const sectionDeleteButtons = document.getElementsByClassName(
      elementMap.sectionDeleteButton
    );
    sectionDeleteButtons &&
      [...sectionDeleteButtons].forEach((button, index) => {
        button.addEventListener("click", () => {
          this.handleDeleteButtonClick(index);
        });
      });
  }

  render() {
    const { stations = [], lines = [] } = this.store;
    const { selectedLine } = this.state;
    const Section = () => `
    <div>
      <h3>${lines[selectedLine]?.name} 관리</h3>
      <h4>구간 등록</h4>
      <select id=${elementMap.sectionStationSelector}>
        ${stations
          .map(
            (station) =>
              `<option value="${station}" 
            }>${station}</option>`
          )
          .join("")}      
      </select>
      <input id=${
        elementMap.sectionOrderInput
      } type="number" placeholder="순서">
      <button id=${elementMap.sectionAddButton}>등록</button>
    </div>
    <table style="margin-top: 25px;">
      <thead>
        <tr>
          <td>순서</td>
          <td>이름</td>
          <td>설정</td>
        </tr>
      </thead>
      <tbody>
        ${
          lines[selectedLine]?.stations
            .map(
              (station, index) =>
                `<tr>
                   <td>${index}</td>
                   <td>${station}</td>
                   <td>
                     <button class=${elementMap.sectionDeleteButton}>노선에서 제거</button>
                   </td>
                 </tr>`
            )
            .join("") || ""
        }
      </tbody>
    </table> 
    `;

    return `
    <div>
      <h3>구간을 수정할 노선을 선택해주세요.</h3>
      ${lines
        .map(
          (line) =>
            `<button class=${elementMap.sectionLineMenuButton} 
               style="margin-right: 5px;">${line.name}</button>`
        )
        .join("")}
    </div>
   ${isNull(selectedLine) ? "" : Section()}
  `;
  }
}

function isLessThanTwoStation(stations) {
  return stations.length > 2;
}

function isNull(value) {
  return String(value) === "null" || String(value) === "undefined";
}

const cloneDeep = (value) => JSON.parse(JSON.stringify(value));
