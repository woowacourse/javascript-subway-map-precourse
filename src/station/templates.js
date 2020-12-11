const stationInputForm = `
<div id="station-input-form">
  <label for="station-name">역 이름</label>
  <div>
    <input 
      type="text" 
      id="station-name-input" 
      name="station-name" 
      placeholder="역 이름을 입력해주세요.">
    </input> 
    <button id="station-add-button">역 추가</button>
  </div>
</div>
`;
const stationList = `
<div id="station-list">
  <h2>🚉 지하철 역 목록</h2>
  <table id="station-names">
  </table>
</div>
`;
const stationListHeader = `
<tr>
  <th>역 이름</th>
  <th>설정</th>
</tr>
`;
const stationDeleteBtn = `
<td><button class="station-delete-button">삭제</button></td>
`;

export { stationInputForm, stationList, stationListHeader, stationDeleteBtn };
