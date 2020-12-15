export const SECTION_CONTENT = `
  <h2>구간을 수정할 노선을 선택해주세요.</h2>
  <div id="section-selector-container"></div>
  <div id="section-modify-container" class="hide">
    <h3 id="section-manage-title"></h3>
    <h4>구간 등록</h4>
    <select id="section-station-selector"></select>
    <input type="number" id="section-order-input" />
    <button id="section-add-button">등록</button>
    <table id="section-table">
      <tbody id="section-table-body"></tbody>
    </table>
  </div>
`;

export const STATION_TABLE_BODY = `
  <tr>
    <th>역 이름</th>
    <th>설정</th>
  </tr>
`;

export const LINE_TABLE_BODY = `
  <tr>
    <th>노선 이름</th>
    <th>상행 종점역</th>
    <th>하행 종점역</th>
    <th>설정</th>
  </tr>
`;

export const SECTION_TABLE_BODY = `
  <tr>
    <th>순서</th>
    <th>이름</th>
    <th>설정</th>
  </tr>
`;
