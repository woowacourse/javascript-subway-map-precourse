export const sectionMenuContainer = lines => {
  return `<div>
    <h3>구간을 수정할 노선을 선택해주세요.</h3>
    ${lines.map(line => sectionLineMenuButton(line.name))}
    ${sectionNameInput}
    ${sectionAddButton}
  </div>`;
};

const sectionLineMenuButton = name => {
  `<button class="section-line-menu-button">${name}</button>`;
};

export const sectionHeading = name => {
  return `<h3>${name}관리</h3>`;
};

export const sectionAddContainer = () => {
  return `<div>
    <h4>구간 등록</h4>
    ${sectionStationSelector}
    ${sectionOrderInput}
    ${sectionAddButton}
  </div>`;
};

const sectionStationSelector =
  '<select id="section-station-selector"></select>';
const sectionOrderInput = '<input id="section-order-input"></input>';
const sectionAddButton = '<button id="section-add-button">등록</button>';

export const sectionTable = sections => {
  `<table${sectionTableHeader}
    ${sections.map(
      (section, idx) =>
        `<tr>
          ${sectionOrder(idx)}
          ${sectionName(section.name)}
          ${sectionDeleteButton}
        </tr>`
    )}
  </table>`;
};

const sectionTableHeader = '<tr><th>순서</th><th>이름</th><th>설정</th></tr>';
const sectionDeleteButton =
  '<td><button class="section-delete-button">노선에서 제거</button></td>';

const sectionOrder = name => {
  return `<td>${name}</td>`;
};

const sectionName = name => {
  return `<td>${name}</td>`;
};
