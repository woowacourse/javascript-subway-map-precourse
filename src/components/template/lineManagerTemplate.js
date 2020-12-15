import stationStorage from '../../utils/stationStorage.js';

const LINE_MANAGER_PAGE_TEMPLATE = `<section class="line-registration">
    <p><strong>노선 이름</strong></p>
    <input type="text" id="line-name-input" placeholder="노선 이름을 입력해주세요">
    <div class="select-line-points">
      <label for="line-start-station-selector">상행 종점</label>
      <select name="start-station" id="line-start-station-selector">
      </select>
      <br />
      <label for="line-end-station-selector">하행 종점</label>
      <select name="end-station" id="line-end-station-selector">
      </select>
    </div>
    <button id="line-add-button">노선 추가</button>
  </section>
  <section class="line-table">
    <table border="1">
      <h2>🚉 지하철 노선 목록</h2>
      <thead>
        <tr>
          <th>노선 이름</th>
          <th>상행 종점역</th>
          <th>하행 종점역</th>
          <th>설정</th>
        </tr>
      </thead>
      <tbody class="line-table-tbody"></tbody>
    </table>
  </section>`;

const ALL_STATION_OPTION_LIST = (stations) => {
  return stations
    .map(
      (station) =>
        `<option id=${station.id} value=${station.name} data-station=${station}>${station.name}</option>`
    )
    .join('');
};

const LINE_TABLE_TEMPLATE = (line) => {
  const lastStationId = line.stationIds[line.stationIds.length - 1];
  const firstStationId = line.stationIds[0];

  return `<tr id=${line.id}>
    <td data-name=${line.name}>${line.name}</td>
    <td data-name=${stationStorage().getStationIdById(firstStationId).name}>${
    stationStorage().getStationIdById(firstStationId).name
  }</td>
    <td data-name=${stationStorage().getStationIdById(lastStationId).name}>${
    stationStorage().getStationIdById(lastStationId).name
  }</td>
    <td><button class="line-delete-button">삭제</button></td>
    </tr>`;
};

export { LINE_MANAGER_PAGE_TEMPLATE, ALL_STATION_OPTION_LIST, LINE_TABLE_TEMPLATE };
