import render from "../../components/render.js";
import app from "../../components/app.js";

function onSectionHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  render(app("section", subwayDatas));

  updateEventToLineBtns();
}

function onLineSelectHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let targetLine = event.target.innerText;
  //   console.log(targetLine);
  subwayDatas.targetLine = ``;
  subwayDatas.targetLine = targetLine;
  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  //   console.log(subwayDatas);
  render(app("section", subwayDatas));

  updateEventToLineBtns();
  updateEventToSectionAddBtns();
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

function onAddSectionHandler() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let station = document.getElementById("section-station-selector").value;
  let order = document.getElementById("section-order-input").value;
  let targetLine = subwayDatas.targetLine;

  subwayDatas.lines.map((line, idx) => {
    if (line.name === targetLine) {
      console.log(subwayDatas.lines[idx].stops);
      subwayDatas.lines[idx].stops.splice(order, 0, station);
      console.log(subwayDatas.lines[idx].stops);
    }
  });
  localStorage.setItem("subwayDatas", JSON.stringify(subwayDatas));
  render(app("section", subwayDatas));
  updateEventToSectionAddBtns();
  updateEventToLineBtns();
}

// / 구간 등록
// array.splice(3,0,"라")
// array.splice("추가하기를 원하는 인덱스", 0, "추가하기를 원하는 이름")

export { onSectionHandler };
