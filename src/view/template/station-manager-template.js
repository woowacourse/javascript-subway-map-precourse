export default class StationManagerTemplate {
  constructor() {
    this.STATION_NAME_INPUT_ID = "station-name-input";
    this.STATION_ADD_BUTTON_ID = "station-add-button";
    this.STATION_TABLE_ID = "station-table";

    this.STATION_DELETE_BUTTON_CLASSNAME = "station-delete-button";
  }

  createStationManagerViewHTML() {
    const stationManagerViewHTML = `
      <label> 역 이름 <br>
        <input id = ${this.STATION_NAME_INPUT_ID} placeholder = "역 이름을 입력해주세요."></input>
        <button id = ${this.STATION_ADD_BUTTON_ID}> 역 추가 </button>
      </label>

      <h2>🚉 지하철 역 목록</h4>
      <table id=${this.STATION_TABLE_ID} border = "1">
        <thead>
          <th> 역 이름 </th>
          <th> 설정 </th>
        </thead>
        <tbody></tbody>
      </table>`;

    return stationManagerViewHTML;
  }

  createStationTableRowHTML(stationName) {
    const sectionRowHTML = `
      <tr data-station = ${stationName}>
        <td> ${stationName} </td>
        <td> <button class = "${this.STATION_DELETE_BUTTON_CLASSNAME}"> 삭제 </button> </td>
      </tr>
    `;

    return sectionRowHTML;
  }
}
