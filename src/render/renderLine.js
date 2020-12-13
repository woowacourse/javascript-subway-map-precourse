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

function lineListTemplate(line, start, end, lineNumber) {
  return `<tr class="line-table-row"data-number=${lineNumber}>
              <td>
                <span>${line}</span>
              </td>
              <td>
                <span>${start}</span>
              </td>
              <td>
                <span>${end}</span>
              </td>
              <td>
                <button class="line-delete-button">삭제</button>
              </td>
            </tr>`;
}

export default function renderStation() {
  initLineListContainer();
  const lines = JSON.parse(localStorage.lines);
  if (lines !== null) {
    initLineList(lines);
  }
}
