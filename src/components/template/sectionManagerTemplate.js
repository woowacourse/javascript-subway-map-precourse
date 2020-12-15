import stationStorage from '../../utils/stationStorage.js';

const SECTION_MANAGER_PAGE_MENU_TEMPLATE = `<section class="section-buttons-container">
    <h3>구간을 수정할 노선을 선택해주세요</h3>
    <nav class="line-buttons"></nav>
  </section>
  <section id="section-selector-container"></section>
  <section id="section-table"></section>`;

const SECTION_MANAGER_PAGE_SELECTOR_TEMPLATE = `<h3 id="line-title"></h3>
  <h4>구간 등록</h4>
  <select name="start-station" id="section-station-selector"></select>
  <input type="number" id="section-order-input" placeholder="순서">
  <button id="section-add-button">등록</button>`;

const SECTION_MANAGER_PAGE_TABLE_TEMPLATE = `<table border="1">
      <thead>
        <tr>
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
        </tr>
      </thead>
    <tbody class="section-table-tbody"></tbody>
  </table>`;

const SECTION_TABLE_TEMPLATE = ({ id, stationIds }) => {
  const stations = stationIds.map(stationStorage().getStationById);

  return stations
    .map(
      (station, index) =>
        `<tr id=${id}>
           <td data-currentIndex=${index}>${index}</td>
           <td data-name=${station.name}>${station.name}</td>
           <td><button class="section-delete-button">노선에서 제거</button></td>
       </tr>`
    )
    .join('');
};

const SECTION_LINE_MENU_BTN = (line) => {
  return `<button class="section-line-menu-button" data-lineId=${line.id}>${line.name}</button>`;
};

export {
  SECTION_MANAGER_PAGE_MENU_TEMPLATE,
  SECTION_MANAGER_PAGE_SELECTOR_TEMPLATE,
  SECTION_MANAGER_PAGE_TABLE_TEMPLATE,
  SECTION_LINE_MENU_BTN,
  SECTION_TABLE_TEMPLATE,
};
