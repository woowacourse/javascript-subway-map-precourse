import { getStationsInLine } from "../utils/sectionUtil.js";

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

//line
export const getLineRow = (line) => {
  return `<tr><td>${line.lineName}</td> 
        <td>${line.startStation}</td> 
        <td>${line.endStation}</td> 
        <td><button data-index=${line.lineName} class="line-delete-button">삭제</button></td></tr>`;
};

export const lineMangeContainer = () => {
  const stations = JSON.parse(localStorage.getItem("stations")) || [];
  const lines = JSON.parse(localStorage.getItem("lines")) || [];

  return `
      <br><b>노선 이름</b></br>
      <input id="line-name-input" type="text" placeholder="노선 이름을 입력해주세요"/>
      <br><br>
      <span>상행 종점 <select id="line-start-station-selector">
        ${stations
          .map((station) => `<option>${station.name}</option>`)
          .join("")}</select></span>
      <br>
      <span>하행 종점 <select id="line-end-station-selector">
      ${stations
        .map((station) => `<option>${station.name}</option>`)
        .join("")}</select></span>
      <br><br>
      <button id="line-add-button">노선 추가</button>
      <h2>🚇 지하철 노선 목록</h2>
  
      <table id="line-list-table">
        <tr><th><b>노선 이름</b></th>
            <th><b>상행 종점역</b></th>
            <th><b>하행 종점역</b></th>
            <th><b>설정</b></th></tr>
            ${lines.map((line) => getLineRow(line)).join("")}
      </table>`;
};

//section
export const selectLineContainer = () => {
  const lines = JSON.parse(localStorage.getItem("lines")) || [];
  return `
      <br><b>구간을 수정할 노선을 선택해주세요.</b></br></br>
      ${lines
        .map(
          (line) =>
            `<button class="section-line-menu-button" 
            data-index=${line.lineName}>${line.lineName}</button>`
        )
        .join("")}
   `;
};

export const getSectionRow = (section, index, lineName) => {
  return `<tr><td>${index}</td> 
        <td>${section}</td> 
        <td><button data-index=${index} data-name=${lineName} class="section-delete-button">노선에서 제거</button></td></tr>`;
};

export const sectionManageContainer = (lineName) => {
  const stations = JSON.parse(localStorage.getItem("stations")) || [];
  const stationsInLine = getStationsInLine(lineName);
  return `
       <br><b>${lineName} 관리</b></br>
       <br><b>구간 등록</b></br>
       <select id="section-station-selector">
       ${stations
         .map((station) => `<option>${station.name}</option>`)
         .join("")}</select>
         <input type="number" id="section-order-input" placeholder="순서">
         <button id="section-add-button" data-name=${lineName}>등록</button><br><br>
         <table id="section-list-table">
         <tr><th><b>순서</b></th>
             <th><b>이름</b></th>
             <th><b>설정</b></th></tr>
             ${stationsInLine
               .map((section, index) => getSectionRow(section, index, lineName))
               .join("")}
        </table>`;
};

//map
export const mapContainer = () => {
  const lines = JSON.parse(localStorage.getItem("lines")) || [];
  return `<br>
      ${lines
        .map(
          (line) => `<b>${line.lineName}</b>
              <ul>${line.stationsInLine
                .map((station) => `<li>${station}</li>`)
                .join("")}</ul><br>`
        )
        .join("")}
  `;
};
