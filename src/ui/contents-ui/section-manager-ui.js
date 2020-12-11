export default class SectionManagerUI {
  constructor({ contentsContainer }) {
    this.contentsContainer_ = contentsContainer;
    this.setHTML();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
  }
}
const NAME_INPUT_ID = "line-name-input";
const START_STATION_SELECTOR_ID = "line-start-station-selector";
const END_STATION_SELECTOR_ID = "line-end-station-selector";
const ADD_BUTTON_ID = "line-add-button";
const DELETE_BUTTON_CLASS = "line-delete-button";
const TABLE_ID = "line-table";
const TEMPLATE = `
<span>노선 이름</span><br>
<input type="text" id="${NAME_INPUT_ID}" placeholder="노선 이름을 입력해주세요."/>
<p></p>
<span>상행 종점</span>
<select id="${START_STATION_SELECTOR_ID}">
    <option value="학생">학생</option>
    <option value="회사원">회사원</option>
    <option value="기타">기타</option>
</select><br>
<span>하행 종점</span>
<select id="${END_STATION_SELECTOR_ID}">
    <option value="학생">학생</option>
    <option value="회사원">회사원</option>
    <option value="기타">기타</option>
</select>
<p></p>
<button id="${ADD_BUTTON_ID}">노선추가</button>
<h2>🚉 지하철 노선 목록</h2>
<table border="1" id="${TABLE_ID}">
<th>노선 이름</th>
<th>상행 종점역</th>
<th>하행 종점역</th>
<th>설정</th>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>
    <button class="${DELETE_BUTTON_CLASS}">삭제</button>
  </td>
<tr>
</table>
`;
