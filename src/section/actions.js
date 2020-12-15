import { isNull, isNegative, isInLine } from "../utils.js";
import { loadLines, saveLines } from "../line/actions.js";
import { loadStations, useStation, disUseStation } from "../station/actions.js";
import {
  printLayout,
  createSectionLineMenu,
  createSectionLineContainer,
  createSectionStationSelector,
  createSectionList,
} from "./templates.js";

let sectionLineName;

const getSectionLine = () => {
  return loadLines().find((x) => x.name === sectionLineName);
};

const getSectionStationName = () => {
  return document.getElementById("section-station-selector").value;
};

const getSectioOrder = () => {
  const sectionOrder = document.getElementById("section-order-input").value;

  document.getElementById("section-order-input").value = "";

  return sectionOrder;
};

const isValid = (_sectionStationName, _sectionOrder) => {
  if (isInLine(getSectionLine().inLineStations, _sectionStationName)) {
    alert("노선의 구간은 중복일 수 없습니다.");
    return;
  } else if (isNull(_sectionOrder)) {
    alert("구간의 순서를 입력해주세요.");
    return;
  } else if (
    isNegative(_sectionOrder) ||
    !Number.isInteger(Number(_sectionOrder))
  ) {
    alert("순서는 0 이상의 자연수를 입력해주세요.");
    return;
  }

  return true;
};

const addSection = () => {
  const lines = loadLines();
  const sectionStationName = getSectionStationName();
  const sectionOrder = getSectioOrder();

  if (isValid(sectionStationName, sectionOrder)) {
    lines
      .find((x) => x.name === sectionLineName)
      .addStation(sectionStationName, sectionOrder);
    useStation(sectionStationName);
    saveLines(lines);

    return lines;
  }
};

const deleteSection = (e) => {
  if (getSectionLine().lineLength() <= 2) {
    alert("노선의 구간은 2개 이하 일 수 없습니다.");
    return;
  }

  const lines = loadLines();

  lines
    .find((x) => x.name === sectionLineName)
    .deleteStation(e.path[2].dataset.sectionIndex);
  disUseStation(e.path[2].dataset.sectionName);
  saveLines(lines);

  return true;
};

const setSectionDeleteBtn = () => {
  const sectionDeleteBtn = document.getElementsByClassName(
    "section-delete-button"
  );

  for (let i = 0; i < sectionDeleteBtn.length; i++) {
    sectionDeleteBtn[i].addEventListener("click", (e) => {
      if (deleteSection(e)) {
        createSectionList(getSectionLine().inLineStations);
        setSectionDeleteBtn();
      }
    });
  }
};

const setSectionAddBtn = () => {
  const sectionAddBtn = document.getElementById("section-add-button");

  sectionAddBtn.addEventListener("click", () => {
    if (addSection()) {
      createSectionList(getSectionLine().inLineStations);
      setSectionDeleteBtn();
    }
  });
};

const setSectionLineMenuBtn = () => {
  const sectionLineMenuBtn = document.getElementsByClassName(
    "section-line-menu-button"
  );

  for (let i = 0; i < sectionLineMenuBtn.length; i++) {
    sectionLineMenuBtn[i].addEventListener("click", (e) => {
      sectionLineName = e.target.innerText;

      createSectionLineContainer(sectionLineName);
      createSectionStationSelector(loadStations());
      setSectionAddBtn();
      createSectionList(getSectionLine().inLineStations);
      setSectionDeleteBtn();
    });
  }
};

export default function SectionManager() {
  printLayout();
  createSectionLineMenu(loadLines());
  setSectionLineMenuBtn();
}
