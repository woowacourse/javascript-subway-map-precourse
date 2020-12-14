import render from "../../components/render.js";
import app from "../../components/app.js";
import { validateSectionDelete } from "../validation/validation.js";

function onSectionHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  console.log(subwayDatas);
  subwayDatas.targetLine = ``;
  render(app("section", subwayDatas));

  updateEventToLineBtns();
}

function onLineSelectHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let targetLine = event.target.innerText;
  //   console.log(targetLine);
  subwayDatas.targetLine = targetLine;
  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  //   console.log(subwayDatas);
  render(app("section", subwayDatas));

  updateDeleteToSectionDeleteBtns();
  updateEventToLineBtns();
  updateEventToSectionAddBtns();
}

function onAddSectionHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let station = document.getElementById("section-station-selector").value;
  let order = document.getElementById("section-order-input").value;
  let targetLine = subwayDatas.targetLine;

  //subwayDatas.lines에 원하는 인덱스에 해당 역 넣어주기
  subwayDatas.lines.map((line, idx) => {
    if (line.name === targetLine) {
      subwayDatas.lines[idx].stops.splice(order, 0, station);
    }
  });
  //subwayDatas.stations 해당 역의 line 정보에 해당 노선 넣어주기
  subwayDatas.subwayStations.forEach((addedStation, idx) => {
    if (station === addedStation.name) {
      subwayDatas.subwayStations[idx].line.push(subwayDatas.targetLine);
    }
  });
  console.log(subwayDatas);

  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));

  render(app("section", subwayDatas));
  updateEventToSectionAddBtns();
  updateEventToLineBtns();
}

function onSectionDeleteHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let deleteTargetIdx = event.target.parentNode.parentNode.childNodes[1].outerText;
  let deleteTargetName = event.target.parentNode.parentNode.childNodes[3].outerText;
  let targetLine = subwayDatas.targetLine;
  //   console.log(deleteTargetName);

  let deleteConfirmed = validateSectionDelete(targetLine);

  if (deleteConfirmed === true) {
    //lines에서 삭제하고
    subwayDatas.lines.map((line) => {
      if (line.name === subwayDatas.targetLine) {
        line.stops.splice(deleteTargetIdx, 1);
        //   localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
      }
    });
    //station 정보의 line에서도 삭제하기
    subwayDatas.subwayStations.map((station) => {
      if (station.name === deleteTargetName) {
        station.line.splice(subwayDatas.subwayStations.indexOf(targetLine), 1);
      }
    });
    localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));

    render(app("section", subwayDatas));
    updateEventToSectionAddBtns();
    updateEventToLineBtns();
    updateDeleteToSectionDeleteBtns();
  }
}

function updateEventToLineBtns() {
  let lineBtns = document.getElementsByClassName(".section-line-menu-button");

  for (let i = 0; i < lineBtns.length; i++) {
    let eachBtn = lineBtns[i];
    eachBtn.addEventListener("click", onLineSelectHandler);
  }
}

function updateEventToSectionAddBtns() {
  document.getElementById("section-add-button").addEventListener("click", onAddSectionHandler);
}

function updateDeleteToSectionDeleteBtns() {
  let deleteBtns = document.getElementsByClassName(".section-delete-button");

  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", onSectionDeleteHandler);
  }
}

// / 구간 등록
// array.splice(3,0,"라")
// array.splice("추가하기를 원하는 인덱스", 0, "추가하기를 원하는 이름")

export { onSectionHandler };
