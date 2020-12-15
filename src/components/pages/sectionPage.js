import { SECTION_LINE_MENU_BUTTON, SECTION_STATION_SELECTOR, SECTION_ORDER_INPUT, SECTION_ADD_BUTTON, SECTION_DELETE_BUTTON } from "../../constants/tag.js";

function sectionManagerPage(subwayDatas) {
  let lines = ``;

  subwayDatas.lines &&
    subwayDatas.lines.forEach(
      (line) =>
        (lines += `
        <button class = ${SECTION_LINE_MENU_BUTTON}>
          ${line.name}
        </button> `)
    );

  let sectionManager = `
  <h4>구간을 수정할 노선을 선택해주세요.</h4>
  <div>
    ${lines}
  </div>
  `;

  if (subwayDatas.targetLine) {
    let targetLine = subwayDatas.targetLine;
    let options = subwayDatas.subwayStations.map((station) => `<option value = "${station.name}">${station.name}</option>`);
    let table = ``;

    subwayDatas.lines.forEach((line) => {
      if (line.name === targetLine) {
        line.stops.forEach((stop, idx) => {
          table += `
          <tr>
            <td>${idx}</td>
            <td>${stop}</td>
            <td><button class=${SECTION_DELETE_BUTTON}>노선에서 제거</button></td>
          </tr>`;
        });
      }
    });

    sectionManager += `
    <div id = "selected-line-section-manager">
    <h4 id = "target-line">${targetLine} 관리</h4>
    <h5>구간 등록<h5>
    <select id=${SECTION_STATION_SELECTOR}>
      ${options}
    </select>
    <input id = ${SECTION_ORDER_INPUT} value = "순서"></input>
    <button id = ${SECTION_ADD_BUTTON}>등록</button>
    <br />
    <br />
    <table border = 1px solid black>
      <thead>
        <tr>
          <th>순서</th>
          <th>역 이름</th>
          <th>설정</th>
        </tr>
      </thead>
      <tbody>
        ${table}
      </tbody>
    </table>
    </div>`;
  }

  return sectionManager;
}

export default sectionManagerPage;
