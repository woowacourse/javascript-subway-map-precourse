//station
export const getStationRow = (stationName) =>
  `<tr><td>${stationName}</td> <td><button data-index=${stationName} class="station-delete-button">삭제</button></td></tr>`;

export const stationMangeContainer = () => {
  const stations = JSON.parse(localStorage.getItem("stations")) || [];
  return `
      <br><b>역 이름</b></br>
      <input id="station-name-input" type="text" placeholder="역 이름을 입력해주세요"/>
      <button id="station-add-button">역 추가</button>
      <h2>🚇 지하철 역 목록</h2>
      <table id="station-list-table">
          <tr><th><b>역 이름</b></th>
          <th><b>설정</b></th></tr>
          ${stations.map((station) => getStationRow(station.name)).join("")}
      </table>`;
};
