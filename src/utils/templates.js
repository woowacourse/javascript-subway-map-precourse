export const getStationsTableHeader = () => {
  return `<th>역 이름</th>
          <th>설정</th>`;
};

export const getLineTableHeader = () => {
  return `<th>노선 이름</th>
          <th>상행 종점역</th>
          <th>하행 종점역</th>
          <th>설정</th>`;
};
export const getSectionTableHeader = () => {
  return `<th>순서</th>
          <th>이름</th>
          <th>설정</th>`;
};
export const printLine = (line) => {
  let lineHTML = `<div class="map"> 
                  <h3>${line.lineName}</h3>`;
  lineHTML += printStations(line.stations);
  return lineHTML;
};

const printStations = (stations) => {
  let stationsHTML = ``;
  stations.map((station) => {
    stationsHTML += `<li>${station}</li>`;
  });
  return stationsHTML;
};

export const getLineNameButton = (lineName) => {
  return `<button class="section-line-menu-button" data-name="${lineName}">${lineName}</button>\n`;
};
