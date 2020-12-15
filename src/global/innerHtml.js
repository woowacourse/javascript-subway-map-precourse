import { SECTION_TAGS } from "../global/constant.js";

export const menuIDs = {
  0: {
    id: "manage-station",
    html: `
          <div id="manage-station">
            <div>
              <h4>역 이름</h4>
              <input
                id="station-name-input"
                type="text"
                placeholder="역 이름을 입력해주세요."
              />
              <button id="station-add-button">역 추가</button>
            </div>
    
            <div>
              <h2>🚉 지하철 역 목록</h2>
              <table border="1">
                <thead>
                  <tr>
                    <th>역 이름</th>
                    <th>설정</th>
                  </tr>
                </thead>
                <tbody id="stations"></tbody>
              </table>
            </div>
          </div>`
  },
  1: {
    id: "manage-lines",
    html: `
            <div id="manage-lines">
              <div>
                <h4>노선 이름</h4>
                <input
                  id="line-name-input"
                  type="text"
                  placeholder="노선 이름을 입력해주세요."
                />
                <div class="line-select-box">
                  상행 종점
                  <select id="line-start-station-selector"></select><br />
                  하행 종점
                  <select id="line-end-station-selector"></select>
                </div>
                <button id="line-add-button">노선 추가</button>
              </div>
    
              <div>
                <h2>🚉 지하철 역 목록</h2>
                <table border="1">
                  <thead>
                    <tr>
                      <th>노선 이름</th>
                      <th>상행 종점역</th>
                      <th>하행 종점역</th>
                      <th>설정</th>
                    </tr>
                  </thead>
                  <tbody id="lines"></tbody>
                </table>
              </div>
          </div>
        `
  },
  2: {
    id: "manage-sections",
    html: `
      <div id="manage-sections">
        <h4>구간을 수정할 노선을 선택해 주세요.</h4>
      </div>`
  },
  3: {
    id: "manage-map-print",
    html: `
      <div id="manage-map-print"></div>
      `
  }
};

export const SECTION_HTML = {
  SECTION_INPUT_HTML: `
    <input id=${SECTION_TAGS.ORDER_INPUT_ID} placeholder="순서" />
    <button type="submit" id=${SECTION_TAGS.ADD_BUTTON_ID}>등록</button>
  `,
  SECTION_TABLE_HTML: `
    <table border="1" id="section-table">
      <thead>
        <tr>
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
        </tr>
      </thead>
      <tbody id="section-tbody"></tbody>
    </table>`
};

export function makeSectionHtml(lineName) {
  return `
    <div id="choose-line">
      <h4>${lineName} 관리</h4>
      <h5>구간 등록</h5>
    </div>`;
}
