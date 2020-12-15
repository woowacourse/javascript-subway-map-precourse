export default class SectionManagerTemplate {
  constructor() {
    this.SECTION_LINE_MENU_CONTAINER_ID = "section-line-menu";
    this.SECTION_LINE_MENU_BUTTON_CLASSNAME = "section-line-menu-button";

    this.SECTION_LINE_CONTENT_CONTAINER_ID = "selected-section-line-container";
    this.SECTION_STATION_SELECTOR_ID = "section-station-selector";
    this.SECTION_ORDER_INPUT_ID = "section-name-input";
    this.SECTION_ADD_BUTTON_ID = "section-add-button";
    this.SECTION_TABLE_ID = "section-table";

    this.SECTION_DELETE_BUTTON_CLASSNAME = "section-delete-button";
  }

  createSectionManagerViewHTML() {
    const sectionManagerViewHTML = `
      <h3> 구간을 수정할 노선을 선택해주세요. </h3>
      <div id="${this.SECTION_LINE_MENU_CONTAINER_ID}"></div>

      <div id = "${this.SECTION_LINE_CONTENT_CONTAINER_ID}"></div>
    `;

    return sectionManagerViewHTML;
  }

  createSectionLineButtonHTML(lineName) {
    const sectionLineButtonHTML = `<button class="${this.SECTION_LINE_MENU_BUTTON_CLASSNAME}" 
                                            data-line="${lineName}"> ${lineName} </button> `;
    return sectionLineButtonHTML;
  }

  createSelectedSectionLineHTML(lineName) {
    const selectedSectionLineHTML = `
      <h3>${lineName} 관리</h3>
      <h4>구간 등록</h4>
      <select id = "${this.SECTION_STATION_SELECTOR_ID}"></select>
      <input id = "${this.SECTION_ORDER_INPUT_ID}" placeholder = "순서를 입력해주세요."></input>
      <button id = "${this.SECTION_ADD_BUTTON_ID}" data-line = "${lineName}">등록</button>

      <table id="${this.SECTION_TABLE_ID}" border = "1">
        <thead>
          <th> 순서 </th>
          <th> 이름 </th>
          <th> 설정 </th>
        </thead>
        <tbody></tbody>
      </table>
      </div>`;

    return selectedSectionLineHTML;
  }

  createSectionRowHTML(lineName, stationName, order) {
    const sectionRowHTML = `
      <tr data-line = ${lineName} data-station = ${stationName}>
        <td style ="text-align:center"> ${order} </td>
        <td> ${stationName} </td>
        <td> <button class = "${this.SECTION_DELETE_BUTTON_CLASSNAME}"> 노선에서 제거 </button> </td>
      </tr>
    `;

    return sectionRowHTML;
  }

  insertStationOptionHTML(targetSelectBox, stationName) {
    const stationOptionElement = document.createElement("option");
    stationOptionElement.setAttribute("value", stationName);
    stationOptionElement.innerText = stationName;

    targetSelectBox.appendChild(stationOptionElement);
  }
}
