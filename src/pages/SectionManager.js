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
  }

  render() {
    const { stations = [], lines = [] } = this.store;
    console.log(stations, lines);
    return `
    <div>
      <h3>구간을 수정할 노선을 선택해주세요.</h3>
      ${lines
        .map(
          (line) =>
            `<button class=${elementMap.sectionLineMenuButton} 
               style="margin-right: 10px;">${line.name}</button>`
        )
        .join("")}
    </div>
    <div>
      <h3>1호선 관리</h3>
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
          <td>0</td>
          <td>인천</td>
          <td>
            <button class=${
              elementMap.sectionDeleteButton
            }>노선에서 제거</button>
          </td>
        </tr>
      </tbody>
    </table>
  `;
  }
}
