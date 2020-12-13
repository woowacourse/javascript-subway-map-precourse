export const sectionMenuContainer = lines => {
  return `<div>
    <h3>구간을 수정할 노선을 선택해주세요.</h3>
    ${lines.map((line, idx) => sectionLineMenuButton(line.name, idx))}
  </div>`;
};

const sectionLineMenuButton = (name, index) => {
  return `<button class="section-line-menu-button" data-item=${index}>
    ${name}
  </button>`;
};

export const sectionAddContainer = (name, stations) => {
  const options = stations
    .map(station => station.name)
    .map(name => `<option value=${name}>${name}</option>`)
    .join('');

  return `<div>
    ${sectionHeading(name)}
    <h4>구간 등록</h4>
    ${sectionStationSelector(options)}
    ${sectionOrderInput}
    ${sectionAddButton}
    </div>`;
};

const sectionHeading = name => {
  return `<h3>${name} 관리</h3>`;
};
const sectionStationSelector = options => {
  return `<select id="section-station-selector">${options}</select>`;
};
const sectionOrderInput =
  '<input id="section-order-input" type="number"></input>';
const sectionAddButton = '<button id="section-add-button">등록</button>';

export const sectionTable = sections => {
  return `<table>
    ${sectionTableHeader}
    ${sections
      .map((section, idx) => {
        return `<tr>
        ${sectionOrder(idx)}
        ${sectionName(section.name)}
        ${sectionDeleteButton}
      </tr>`;
      })
      .join('')}
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
