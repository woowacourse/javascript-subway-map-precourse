// import render from "../render.js";
// import app from "../app.js";

function stationManagerPage(subwayDatas) {
  let table = ``;

  // let stations = subwayDatas.subwayStations;

  let names = subwayDatas.subwayStations;
  names &&
    names.map((name) => {
      table += `<tr>
      <td>${name}</td>
      <td>
        <button class="station-delete-button">삭제</button>
      </td>
    </tr>`;
    });

  let stationManager = `
  <h4>역 이름<h4>
  <input id = "station-add-input"></input>
  <button id = "station-add-button">역 추가</button>
  <h3>🚉지하철 역 목록</h3>
  
  <table border = 1px solid black>
    <thead>
      <tr>
        <th>역 이름</th>
        <th>설정</th>
      </tr>
    </thead>
    <tbody>
    ${table}
    </tbody>
  </table>
 
  `;
  return stationManager;
}

// let stations = JSON.parse(localStorage.getItem("stations"));

// function onStationHandler() {
//   render(app("station", stations));
//   stations && updateEvent();
//   document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);
// }

// function onAddStationHandler() {
//   let stationName = document.getElementById("station-add-input").value;
//   stations.push(stationName);

//   localStorage.setItem("stations", JSON.stringify(stations));
//   render(app("station", stations));
//   console.log("arr", localStorage);
//   stations && updateEvent();
// }

// // 렌더, 역 추가 버튼에 이벤트 리스너 추가, 삭제 버튼에 이벤트 리스너 추가
// function updateEvent() {
//   // render(app("station", stations));
//   document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);

//   let deleteBtns = document.getElementsByClassName("station-delete-button");
//   for (let i = 0; i < deleteBtns.length; i++) {
//     deleteBtns[i].addEventListener("click", onDeleteStationHandler);
//   }
// }

// function onDeleteStationHandler() {
//   let tr = event.target.parentNode.parentNode;

//   let deleteIdx = stations.indexOf(tr.childNodes[1].outerText);
//   if (deleteIdx > -1) stations.splice(deleteIdx, 1);
//   localStorage.clear();
//   localStorage.setItem("stations", JSON.stringify(stations));
//   tr.parentNode.removeChild(tr);
//   render(app("station", stations));
//   updateEvent();
// }

// export default stationManagerPage;
export { stationManagerPage };
