export const stationListTemplate = stationList => {
  let template = `
      <tr>
        <th>역 이름</th>
        <th>설정</th>
      </tr>
  `;
  for (const station of stationList) {
    template += `
      <tr data-stationName="${station}">
        <td>${station}</td>
        <td><button id="station-remove-button">삭제</button></td>
      </tr>
    `;
  }
  stationListPresenter(template);
};

export const stationListPresenter = template => {
  const stationNameTable = document.querySelector("#station-name-table");
  stationNameTable.innerHTML = template;
};
