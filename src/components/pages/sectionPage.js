// import { onLineSelectHandler } from "../../library/handlers/sectionHandler.js";

function sectionManagerPage(subwayDatas) {
  let lines = ``;

  console.log(subwayDatas);
  subwayDatas.lines &&
    subwayDatas.lines.map(
      (line) =>
        (lines += `<button class = ".section-line-menu-button">
            ${line.name}
          </button> `)
    );

  let targetLine = subwayDatas.targetLine;

  let sectionManager = `
  <h4>구간을 수정할 노선을 선택해주세요.</h4>
  <div>
  ${lines}
  </div>
  `;

  if (subwayDatas.targetLine) {
    sectionManager += `
    <div id = "selected-line-section-manager">
    <h4>${targetLine} 관리</h4>
    <h5>구간 등록<h5>
    <select id="section-station-selector">
      <option value = "인천">인천</option>
      <option value = "인천">회기</option>
    </select>
    <input id = "section-order-input"></input>
    <button id = "section-add-button">등록</button>
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
        <tr>
          <td>0</td>
          <td>인천</td>
          <td><button class="section-delete-button">노선에서 제거</button></td>
        </tr>
      </tbody>
    </table>
    </div>`;
  }

  return sectionManager;
}

console.log(document.getElementById("selected-line-section-manager"));

// function onLineSelectHandler() {
//   let targetLine = event.target.innerText;
//   console.log(targetLine);
// }
// let targetLine = onLineSelectHandler();
// console.log(targetLine);

export default sectionManagerPage;
