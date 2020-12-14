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
      selectedLine: null,
    };
    this.handleLineButtonClick = (index) => {
      const line = this.store.lines[index];
      this.setState({ ...this.state, selectedLine: line });
      console.log(this.state.selectedLine);
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
  }

  render() {
    const { stations = [], lines = [] } = this.store;
    const { selectedLine } = this.state;
    console.log(Boolean(selectedLine));
    let section = `
    <div>
      <h3>${selectedLine ? selectedLine.name : ""} 관리</h3>
      <h4>구간 등록</h4>
      <select id=${elementMap.sectionStationSelector}>
        ${stations.map(
          (station) =>
            `<option value="${station}" 
            }>${station}</option>`
        )}      
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
        <tr>
          <td></td>
          <td></td>
          <td>
            <button class=${
              elementMap.sectionDeleteButton
            }>노선에서 제거</button>
          </td>
        </tr>
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
   ${selectedLine ? section : `<div></div>`}
  `;
  }
}
