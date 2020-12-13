import removeLineEvent from '../../event/line/removeLineEvent.js';

function lineListContainerTemplate() {
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
  const $lineTableContainer = document.querySelector('.line-table-container');
  $lineTableContainer.innerHTML = lineListContainerTemplate();
}

function lineListTemplate(line, lineNumber) {
  return `<tr data-number=${lineNumber}>
              <td>${line[0]}</td>
              <td>${line[1]}</td>
              <td>${line[line.length - 1]}</td>
              <td data-number=${lineNumber}>
                <button class="line-delete-button">삭제</button>
              </td>
          </tr>`;
}

function initLineList(lines) {
  const $lineTable = document.querySelector('.line-table');
  let lineNumber = 0;

  lines
    .split(',')
    .forEach((line) =>
      $lineTable.insertAdjacentHTML(
        'beforeend',
        lineListTemplate(line.split(' '), lineNumber++),
      ),
    );
  removeLineEvent();
}

export default function renderLineList() {
  initLineListContainer();

  const lines = JSON.parse(localStorage.getItem('lines'));
  if (lines !== null) {
    initLineList(lines);
  }
}
