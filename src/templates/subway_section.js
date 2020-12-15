export const sectionMenuContainer = lines => {
  return `<div>
    <h3>구간을 수정할 노선을 선택해주세요.</h3>
    ${lines
      .map(({ name }) => {
        return `<button class="section-line-menu-button" data-item=${name}>
        ${name}
      </button>`;
      })
      .join('')}
  </div>`;
};

export const sectionAddContainer = (name, stations) => {
  return `<div class="setcion-add-container">
    <h3>${name} 관리</h3>
    <h4>구간 등록</h4>
    <select id="section-station-selector">${options(stations)}</select>
    <input id="section-order-input" placeholder="순서" type="number"></input>
    <button id="section-add-button">등록</button>
  </div>`;
};

const options = stations => {
  return stations
    .map(({ name }) => `<option value=${name}>${name}</option>`)
    .join('');
};

export const sectionTable = sections => {
  return `<table>
    <tr>
      <th>순서</th>
      <th>이름</th>
      <th>설정</th>
    </tr>
    ${sectionTableRows(sections)}
  </table>`;
};

const sectionTableRows = sections => {
  return sections
    .map(({ name }, idx) => {
      return `<tr>
      <td>${idx}</td>
      <td>${name}</td>
      <td>
        <button class="section-delete-button" data-item=${name}>노선에서 제거</button>
      </td>
    </tr>`;
    })
    .join('');
};
