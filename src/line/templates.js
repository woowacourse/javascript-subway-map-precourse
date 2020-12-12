const lineInputForm = `
<div id="line-input-form">
  <label for="line-name">노선 이름</label>
  <div>
    <input 
      type="text" 
      id="line-name-input" 
      name="line-name" 
      placeholder="노선 이름을 입력해주세요.">
    </input> 
  </div>
  <div>
    <label for="start-station">상행 종점</label>
    <select name="start-station" id="line-start-station-selector"></select></br>
    <label for="end-station">하행 종점</label>
    <select name="end-station" id="line-end-station-selector"></select>
  </div>
  <button id="line-add-button">노선 추가</button>
</div>
`;
const lineList = `
<div id="line-list">
  <h2>🚉 지하철 노선 목록</h2>
  <table id="line-names">
  </table>
</div>
`;
const lineListHeader = `
<tr>
  <th>노선 이름</th>
  <th>상행 종점역</th>
  <th>하행 종점역</th>
  <th>설정</th>
</tr>
`;
const lineDeleteBtn = `
<td><button class="line-delete-button">삭제</button></td>
`;

export { lineInputForm, lineList, lineListHeader, lineDeleteBtn };
