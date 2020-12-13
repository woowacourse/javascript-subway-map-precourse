import Line from "./models.js";
import { isNull, isDuplication, isEmpty } from "../utils.js";
import { disUseStation, loadStations, useStation } from "../station/actions.js";
import {
  lineInputForm,
  lineList,
  lineListHeader,
  lineDeleteBtn,
} from "./templates.js";

const lineManagerBtn = document.getElementById("line-manager-button");

const loadLines = () => {
  return JSON.parse(lineManagerBtn.dataset.lines).map(
    (x) => new Line(x.name, x.inLineStations)
  );
};

const saveLines = (_lines) => {
  lineManagerBtn.dataset.lines = JSON.stringify(_lines);
};

const printLayout = () => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = lineInputForm + lineList;
};

const createStationSelector = (_stations) => {
  const startStationSelector = document.getElementById(
    "line-start-station-selector"
  );
  const endStationSelector = document.getElementById(
    "line-end-station-selector"
  );

  for (let i = 0; i < _stations.length; i++) {
    startStationSelector.innerHTML += `<option>${_stations[i].name}</option>`;
    endStationSelector.innerHTML += `<option>${_stations[i].name}</option>`;
  }
};

const createLineList = (_lines) => {
  const lineNames = document.getElementById("line-names");
  lineNames.innerHTML = lineListHeader;

  for (let i = 0; i < _lines.length; i++) {
    lineNames.innerHTML += `
    <tr data-line-index="${i}">
      <td>${_lines[i].name}</td>
      <td>${_lines[i].startStation()}</td>
      <td>${_lines[i].endStation()}</td>
      ${lineDeleteBtn}
    </tr>
    `;
  }
};

const updateLineList = (_lines) => {
  saveLines(_lines);
  createLineList(_lines);
};

const isValid = (_lineName, _startStation, _endStation) => {
  if (isNull(_lineName)) {
    alert("노선 이름을 입력해주세요.");
    return;
  } else if (isDuplication(loadLines(), _lineName)) {
    alert("중복된 노선 이름입니다.");
    return;
  } else if (_startStation === _endStation) {
    alert("상행 종점과 하행 종점은 서로 다른 역을 선택해주세요.");
    return;
  }

  return true;
};

const getLineName = () => {
  const lineNameInput = document.getElementById("line-name-input");
  const lineName = lineNameInput.value;

  lineNameInput.value = "";

  return lineName;
};

const getStartStation = () => {
  return document.getElementById("line-start-station-selector").value;
};

const getEndStation = () => {
  return document.getElementById("line-end-station-selector").value;
};

const createLine = () => {
  if (isEmpty(loadStations())) {
    alert("지하철 역 목록 비어있습니다.");
    return;
  }

  const lineName = getLineName();
  const startStation = getStartStation();
  const endStation = getEndStation();

  if (isValid(lineName, startStation, endStation)) {
    useStation(startStation);
    useStation(endStation);

    return new Line(lineName, [startStation, endStation]);
  }
};

const deleteLine = (e) => {
  const lines = loadLines();
  const lineIndex = e.path[2].dataset.lineIndex;
  const usedstations = lines[lineIndex].inLineStations;

  for (let i = 0; i < usedstations.length; i++) {
    disUseStation(usedstations[i]);
  }

  lines.splice(lineIndex, 1);

  return lines;
};

const setLineDeleteBtn = () => {
  const lineDeleteBtn = document.getElementsByClassName("line-delete-button");

  for (let i = 0; i < lineDeleteBtn.length; i++) {
    lineDeleteBtn[i].addEventListener("click", (e) => {
      const linesWithoutDeleteLine = deleteLine(e);

      if (linesWithoutDeleteLine) {
        updateLineList(linesWithoutDeleteLine);
        setLineDeleteBtn();
      }
    });
  }
};

export default function LineManager() {
  printLayout();
  createStationSelector(loadStations());
  createLineList(loadLines());
  setLineDeleteBtn();

  const lineAddBtn = document.getElementById("line-add-button");

  lineAddBtn.addEventListener("click", () => {
    const newLine = createLine();

    if (newLine) {
      updateLineList([...loadLines(), newLine]);
      setLineDeleteBtn();
    }
  });
}

export { loadLines, saveLines };
