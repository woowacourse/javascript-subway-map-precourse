export const stationManagerViewHTML = `
  <label> 역 이름 <br>
    <input id = "station-name-input" placeholder = "역 이름을 입력해주세요."></input>
    <button id = "station-add-button"> 역 추가 </button>
  </label>

  <h2>🚉 지하철 역 목록</h4>
  <table id="station-table" border = "1">
    <thead>
      <th> 역 이름 </th>
      <th> 설정 </th>
    </thead>
    <tbody></tbody>
  </table>
`;

export const createStationTableRowHTML = (stationName) => {
  const sectionRowHTML = `
      <tr data-station = ${stationName}>
        <td> ${stationName} </td>
        <td> <button class = "station-delete-button"> 삭제 </button> </td>
      </tr>
    `;
  return sectionRowHTML;
};
