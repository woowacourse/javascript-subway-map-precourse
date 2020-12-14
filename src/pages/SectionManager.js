import Component from "../core/Component.js";

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
      selectedLineName: null,
      selectedLineStation: null,
    };

    this.handleLineButtonClick = (index) => {
      const line = this.store.lines[index];
      this.setState({
        ...this.state,
        selectedLineName: [line.name],
        selectedLineStation: [line.start, line.end],
      });
      console.log(this.state.selectedLine);
    };

    this.handleAddButtonClick = (station, order) => {
      this.state.selectedLineStation.splice(order, 0, station);
      this.setState({ ...this.state });
    };

    this.handleDeleteButtonClick = (index) => {
      this.state.selectedLineStation.splice(index, 1);
      this.setState({ ...this.state });
    };
  }

  mount() {
    const sectionLineMenuButtons = document.getElementsByClassName(
      elementMap.sectionLineMenuButton
    );
    [...sectionLineMenuButtons].forEach((button, index) => {
      button.addEventListener("click", () => {
        this.handleLineButtonClick(index);
      });
    });

    const sectionStationSelector = document.getElementById(
      elementMap.sectionStationSelector
    );

    const sectionOrderInput = document.getElementById(
      elementMap.sectionOrderInput
    );

    const sectionAddButton = document.getElementById(
      elementMap.sectionAddButton
    );
    sectionAddButton.addEventListener("click", () => {
      this.handleAddButtonClick(
        sectionStationSelector.value,
        sectionOrderInput.value
      );
    });

    const sectionDeleteButtons = document.getElementsByClassName(
      elementMap.sectionDeleteButton
    );
    [...sectionDeleteButtons].forEach((button, index) => {
      button.addEventListener("click", () => {
        this.handleDeleteButtonClick(index);
      });
    });
  }

  render() {
    const { stations = [], lines = [] } = this.store;
    const { selectedLineName = [], selectedLineStation = [] } = this.state;

    console.log(selectedLineStation);
    let section = `
    <div>
      <h3>${
        selectedLineName ? selectedLineName[selectedLineName.length - 1] : null
      } 관리</h3>
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
      <input id=${elementMap.sectionOrderInput} placeholder="순서">
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
          selectedLineStation
            ? selectedLineStation
                .map(
                  (line, index) =>
                    `<tr>
                       <td>${index}</td>
                       <td>${line}</td>
                       <td>
                         <button class=${elementMap.sectionDeleteButton}>노선에서 제거</button>
                       </td>
                     </tr>`
                )
                .join("")
            : null
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
   ${selectedLineName && selectedLineStation ? section : `<div></div>`}
  `;
  }
}
