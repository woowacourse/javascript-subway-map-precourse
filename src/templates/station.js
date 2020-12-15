export const stationAddContainer = () => {
  return `<div>
    <div>
      <strong>역 이름</strong>
    </div>
    <input id="station-name-input" placeholder="역 이름을 입력해주세요."></input>
    <button id="station-add-button">역 추가</button>
  </div>`;
};

export const stationList = stations => {
  return `<div class="station-list">
    <h2>🚉지하철 역 목록</h2>
    <table>
      <tr>
        <th>역 이름</th>
        <th>설정</th>
      </tr>
      ${stationTableRows(stations)}
    </table>
  </div>`;
};

const stationTableRows = stations => {
  return stations
    .map(({ name }) => {
      return `<tr>
        <td>${name}</td>
        <td>
          <button class="station-delete-button" data-item=${name}>삭제</button>
        </td>
      </tr>`;
    })
    .join('');
};
