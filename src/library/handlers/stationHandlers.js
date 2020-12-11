import render from "../../components/render.js";
import app from "../../components/app.js";

function onStationHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  render(app("station", subwayDatas));
  subwayDatas && updateEvent();
  document.getElementById("station-add-button").addEventListener("click", onAddStationHandler);
}

function onAddStationHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  // let subwayDatas = {
  //   subwayStations: [],
  //   lines: [],
  // };

  let subwayStations = {
    name: name,
    line: [],
  };

  subwayStations.name = document.getElementById("station-add-input").value;
  subwayDatas.subwayStations.push(subwayStations.name);

  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  render(app("station", subwayDatas));
  subwayDatas && updateEvent();
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
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let tr = event.target.parentNode.parentNode;

  let deleteIdx = subwayDatas.subwayStations.indexOf(tr.childNodes[1].outerText);
  if (deleteIdx > -1) subwayDatas.subwayStations.splice(deleteIdx, 1);
  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  render(app("station", subwayDatas));
  updateEvent();
}

export { onStationHandler };
