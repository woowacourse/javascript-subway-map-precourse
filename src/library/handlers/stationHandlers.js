import render from "../../components/render.js";
import app from "../../components/app.js";

let stations = JSON.parse(localStorage.getItem("stations"));

function onStationHandler() {
  render(app("station", stations));
  stations && updateEvent();
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);
}

function onAddStationHandler() {
  let stationName = document.getElementById("station-add-input").value;
  stations.push(stationName);

  localStorage.setItem("stations", JSON.stringify(stations));
  render(app("station", stations));
  stations && updateEvent();
}

// 렌더, 역 추가 버튼에 이벤트 리스너 추가, 삭제 버튼에 이벤트 리스너 추가
function updateEvent() {
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);

  let deleteBtns = document.getElementsByClassName("station-delete-button");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onDeleteStationHandler);
  }
}

function onDeleteStationHandler() {
  let tr = event.target.parentNode.parentNode;

  let deleteIdx = stations.indexOf(tr.childNodes[1].outerText);
  if (deleteIdx > -1) stations.splice(deleteIdx, 1);
  localStorage.clear();
  localStorage.setItem("stations", JSON.stringify(stations));
  tr.parentNode.removeChild(tr);
  render(app("station", stations));
  updateEvent();
}

export { onStationHandler };
