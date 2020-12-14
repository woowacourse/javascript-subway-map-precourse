const SECTION_LINE_MENU = `
<h3>구간을 수정할 노선을 선택해주세요.</h3>
<div id="section-line-menu">
</div>
<div id="section-line-container">
</div>
`;
const SECTION_STATION_INPUT_FORM = `
<h4>구간 등록</h4>
<div>
  <select id="section-station-selector">
  </select>
  <input 
    type="number" 
    id="section-order-input"  
    placeholder="순서">
  </input>
  <button id="section-add-button">등록</button>
</div>
`;
const SECTION_LIST = `
<div id="section-list">
  <table id="section-names">
  </table>
</div>
`;
const SECTION_LIST_HEADER = `
<tr>
  <th>순서</th>
  <th>이름</th>
  <th>설정</th>
</tr>
`;
const SECTION_DELETE_BUTTON = `
<td><button class="section-delete-button">노선에서 제거</button></td>
`;

const printLayout = () => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = SECTION_LINE_MENU;
};

const createSectionLineMenu = (_lines) => {
  const sectionLineMenu = document.getElementById("section-line-menu");

  for (let i = 0; i < _lines.length; i++) {
    sectionLineMenu.innerHTML += `<button class="section-line-menu-button">${_lines[i].name}</button>\n`;
  }
};

const createSectionLineContainer = (_sectionLineName) => {
  const sectionLineContainer = document.getElementById(
    "section-line-container"
  );

  sectionLineContainer.innerHTML =
    `<h3>${_sectionLineName} 관리</h3>` +
    SECTION_STATION_INPUT_FORM +
    SECTION_LIST;
};

const createSectionStationSelector = (_stations) => {
  const sectionStationSelector = document.getElementById(
    "section-station-selector"
  );

  for (let i = 0; i < _stations.length; i++) {
    sectionStationSelector.innerHTML += `<option>${_stations[i].name}</option>`;
  }
};

const createSectionList = (_sections) => {
  const sectionNames = document.getElementById("section-names");

  sectionNames.innerHTML = SECTION_LIST_HEADER;

  for (let i = 0; i < _sections.length; i++) {
    sectionNames.innerHTML += `
    <tr data-section-index="${i}" data-section-name="${_sections[i]}">
      <td class="section-order">${i}</td>
      <td>${_sections[i]}</td>
      ${SECTION_DELETE_BUTTON}
    </tr>
    `;
  }
};

export {
  printLayout,
  createSectionLineMenu,
  createSectionLineContainer,
  createSectionStationSelector,
  createSectionList,
};
