export const INPUT_LESS_THAN_2_MESSAGE = "역 이름은 2자 이상이어야 합니다.";
export const INPUT_ALREADY_EXIST_NAME_MESSAGE = "이미 존재하는 역입니다.";
export const INPUT_ALREADY_EXIST_LINE_NAME_MESSAGE =
  "이미 존재하는 노선 이름입니다.";
export const CANT_SAME_START_AND_END_MESSAGE =
  "상행 종점과 하행 종점이 같을 수 없습니다.";
export const ALREAY_EXIST_SAME_END_POINTS =
  "종점이 일치하는 노선이 이미 존재합니다.";

export const DELETE_TEXT = "삭제";

export const LOCAL_STORAGE_STATIONS_KEY = "STATIONS";
export const LOCAL_STORAGE_LINES_KEY = "LINES";

export const SECTION_CONTENT_SKELETON = `<h2>구간을 수정할 노선을 선택해주세요.</h2>
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
  </div>`;
