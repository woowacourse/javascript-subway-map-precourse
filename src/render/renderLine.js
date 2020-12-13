import delLineEvent from "../event/line/delLineEvent.js";

function selectListTemplate() {
  const stations = JSON.parse(localStorage.stations);
  let newTemplate = "";
  stations.forEach((station) => (newTemplate += `<option>${station}</option>`));
  return newTemplate;
}

function initSelectContainer() {
  const $selectContainers = document.querySelectorAll(".line-station-selector");
  $selectContainers.forEach(
    (selectContainer) => (selectContainer.innerHTML = selectListTemplate())
  );
}

function lineTableTemplate() {
  return `<table class="line-table" border="1">
    <tr>
    <th>노선 이름</th>
    <th>상행 종점역</th>
    <th>하행 종점역</th>
    <th>설정</th>
    </tr>
    </table>`;
}

function initLineListContainer() {
  const $lineTableContainer = document.getElementById("line-table-container");
  $lineTableContainer.innerHTML = lineTableTemplate();
}

function lineListTemplate(line, lineNumber) {
  return `<tr class="line-table-row"data-number=${lineNumber}>
              <td>
                <span>${line.name}</span>
              </td>
              <td>
                <span>${line.sections[0]}</span>
              </td>
              <td>
                <span>${line.sections[line.sections.length - 1]}</span>
              </td>
              <td>
                <button class="line-delete-button">삭제</button>
              </td>
            </tr>`;
}

function initLineList(lines) {
  const $lineTable = document.querySelector(".line-table");
  let lineNumber = 0;
  console.log(lines);

  lines.forEach((line) =>
    $lineTable.insertAdjacentHTML("beforeend", lineListTemplate(line, lineNumber++))
  );

  delLineEvent();
}

export default function renderStation() {
  initSelectContainer();
  initLineListContainer();
  const lines = JSON.parse(localStorage.lines);
  if (lines !== null) {
    initLineList(lines);
  }
}
