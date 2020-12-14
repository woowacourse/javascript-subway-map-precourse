import addSectionEvent from '../../controller/section/addSectionEvent.js';
import removeSectionEvent from '../../controller/section/removeSectionEvent.js';
import renderSelector from '../common/renderSelector.js';

function sectionListTemplate(lineList) {
  let listNumber = 0;
  return lineList
    .map((line) => {
      return `<tr data-number=${listNumber}>
              <td>${listNumber++}</td>
              <td>${line}</td>
              <td>
                <button class="section-delete-button" data-number=${listNumber}>노선에서 삭제</button>
              </td>
            </tr>`;
    })
    .join('');
}

function sectionListTableTemplate(lineList) {
  return `<table class="station-table" border="1">
            <tr>
              <th>순서</th>
              <th>이름</th>
              <th>설정</th>
            </tr>
            ${sectionListTemplate(lineList)}
          </table>`;
}

function sectionContainerTemplate(line, lineNumber) {
  return `<div class="section-container" data-number=${lineNumber} hidden>
            <h3>${line[0]} 관리</h3>
            <strong>구간 등록</strong><br /><br />
            <div>
              <select class="station-selector"></select>
              <input class="section-position-input" type="number"
                placeholder="순서" min="0" />
              <button id="section-add-button" data-number=${lineNumber}>
                등록
              </button>
            </div><br />
            <div>${sectionListTableTemplate(line.splice(1))}</div> 
          </div>`;
}

function initSectionContainer(lineList) {
  const $sectionInputContainer = document.querySelector(
    '.section-input-container',
  );

  let lineNumber = 0;
  $sectionInputContainer.innerHTML = '';
  lineList.forEach((line) =>
    $sectionInputContainer.insertAdjacentHTML(
      'beforeend',
      sectionContainerTemplate(line.split(' '), lineNumber++),
    ),
  );
  renderSelector();
}

export default function renderSectionContainer() {
  const lines = JSON.parse(localStorage.getItem('lines'));
  if (lines) {
    initSectionContainer(lines.split(','));
  }
  addSectionEvent();
  removeSectionEvent();
}
