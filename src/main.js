import { initHTML } from "./uiManager.js";
import render from "./components/render.js";
import app from "./components/app.js";
import { onStationHandler } from "./library/handlers/stationHandlers.js";
import { onLineHandler } from "./library/handlers/lineHandlers.js";

export default function main() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  if (!subwayDatas) {
    let subwayDatas = {
      subwayStations: [],
      lines: [],
    };
    localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  }
  // stations = [{name:"왕십리", line:["중앙선","2호선"]}, {name:"회기", line:["중앙선","1호선"]}]
  // lines = [{name:"1호선", stops:["인천","동대문","왕십리","회기"]}]

  // console.log(subwayDatas);
  initHTML();
  render(app());
  addEventToMainBtns();
}

function addEventToMainBtns() {
  document.getElementById("station-manager-button").addEventListener("click", onStationHandler);
  document.getElementById("line-manager-button").addEventListener("click", onLineHandler);
  document.getElementById("section-manager-button").addEventListener("click", onSectionHandler);
  document.getElementById("map-print-manager-button").addEventListener("click", onMapPrintHandler);
}

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
//   stations && updateEvent();
// }

// // 렌더, 역 추가 버튼에 이벤트 리스너 추가, 삭제 버튼에 이벤트 리스너 추가
// function updateEvent() {
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

function onSectionHandler() {
  render(app("section"));
}

function onMapPrintHandler() {
  render(app("map"));
}
