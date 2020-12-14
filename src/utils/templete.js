const STATION_MANAGER_PAGE_TEMPLATE = `<p><strong>역 이름</strong></p>
  <input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요.">
  <button id="station-add-button">역 추가</button>
  <div class="all-station-table">
  <table border="1">
  <h2>🚉 지하철 역 목록</h2>
  <thead>
  <tr>
  <th>역 이름</th>
  <th>설정</th>
  </tr>
  </thead>
  <tbody class="station_manager_tbody">
  </tbody>
  </table>
  </div>`;

const STATION_TABLE_TEMPLATE = (station) => {
  return `<tr id=${station.id} data-lines=${station.line}>
    <td data-name=${station.name}>${station.name}</td>
    <td><button class="station-delete-button">삭제</button></td>
    </tr>`;
};

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

const LINE_TABLE_TEMPLATE = (lines) => {
  const lineLength = lines.stations.length;

  return `<tr id=${lines.id}>
    <td data-name=${lines.name}>${lines.name}</td>
    <td data-name=${lines.stations[0].name}>${lines.stations[0].name}</td>
    <td data-name=${lines.stations[lineLength - 1].name}>${lines.stations[lineLength - 1].name}</td>
    <td><button class="line-delete-button">삭제</button></td>
    </tr>`;
};

export {
  STATION_MANAGER_PAGE_TEMPLATE,
  STATION_TABLE_TEMPLATE,
  LINE_MANAGER_PAGE_TEMPLATE,
  ALL_STATION_OPTION_LIST,
  LINE_TABLE_TEMPLATE,
};
