export default class LineManagerTemplate {
  constructor() {
    this.LINE_NAME_INPUT_ID = "line-name-input";
    this.LINE_START_STATION_SELECTOR_ID = "line-start-station-selector";
    this.LINE_END_STATION_SELECTOR_ID = "line-end-station-selector";
    this.LINE_ADD_BUTTON_ID = "line-add-button";
    this.LINE_TABLE_ID = "line-table";

    this.LINE_DELETE_BUTTON_CLASSNAME = "line-delete-button";
  }

  createLineManagerViewHTML() {
    const lineManagerViewHTML = `
      <label> 노선 이름 <br>
        <input id = "${this.LINE_NAME_INPUT_ID}" placeholder = "노선 이름을 입력해주세요."></input>
      </label><br><br>
      
      <label>상행 종점
        <select id = "${this.LINE_START_STATION_SELECTOR_ID}"> 
        </select>
      </label><br>
      
      <label>하행 종점
        <select id = "${this.LINE_END_STATION_SELECTOR_ID}"> 
        </select>
      </label><br><br>
      
      <button id = "${this.LINE_ADD_BUTTON_ID}"> 노선 추가 </button>
      
      <h2>🚉 지하철 노선 목록</h4>
      <table id="${this.LINE_TABLE_ID}" border = "1">
        <thead>
          <th> 노선 이름 </th>
          <th> 상행 종점역 </th>
          <th> 하행 종점역 </th>
          <th> 설정 </th>
        </thead>
        <tbody></tbody>
      </table>
    `;

    return lineManagerViewHTML;
  }

  createLineTableRowHTML(lineName, startStationName, endStationName) {
    const sectionRowHTML = `
      <tr data-line= ${lineName}>
        <td> ${lineName} </td>
        <td> ${startStationName} </td>
        <td> ${endStationName} </td>
        <td> <button class = "${this.LINE_DELETE_BUTTON_CLASSNAME}"> 삭제 </button> </td>
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
