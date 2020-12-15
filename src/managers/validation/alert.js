function stationNameAlert(inputValue) {
  return uniqueStationNameAlert(inputValue) || spaceAlert(inputValue) || underTwoCharacterAlert(inputValue);
}

function uniqueStationNameAlert(inputValue) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";

  subwayDatas.subwayStations.map((station) => {
    if (station.name === inputValue) {
      alertMsg = "중복된 역 이름을 입력하셨습니다.";
    }
  });

  return alertMsg;
}

function spaceAlert(inputValue) {
  let alertMsg = "";

  if (inputValue === "") {
    alertMsg = "공백을 입력하셨습니다.";
  }

  return alertMsg;
}

function underTwoCharacterAlert(inputValue) {
  let alertMsg = "";

  if (inputValue.length < 2) {
    alertMsg = "2글자 이상으로 입력해주세요.";
  }

  return alertMsg;
}

function stationDeleteAlert(deleteTarget) {
  return inlineAlert(deleteTarget);
}

function inlineAlert(deleteTarget) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";

  subwayDatas.subwayStations.forEach((station, idx) => {
    if (station.name === deleteTarget && subwayDatas.subwayStations[idx].line.length >= 1) {
      alertMsg = "노선에 포함된 역은 삭제할 수 없습니다.";
    }
  });

  return alertMsg;
}

function lineNameAlert(inputValue) {
  return ununiqueLineNameAlert(inputValue) || spaceAlert(inputValue);
}

function ununiqueLineNameAlert(inputValue) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";

  subwayDatas.lines.forEach((line) => {
    if (line.name === inputValue) {
      alertMsg = "중복된 노선 이름을 입력하셨습니다.";
    }
  });

  return alertMsg;
}

function startAndEndStationAlert(startAndEndStations) {
  return unUniqueLineAlert(startAndEndStations) || sameStartAndEndStationAlert(startAndEndStations);
}

function unUniqueLineAlert(startAndEndStations) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";

  subwayDatas.lines.forEach((line) => {
    if (line.stops[0] === startAndEndStations[0] && line.stops[line.stops.length - 1] === startAndEndStations[1]) {
      alertMsg = "상행, 하행 종점역이 중복되는 노선이 이미 존재합니다.";
    }
  });

  return alertMsg;
}

function sameStartAndEndStationAlert(startAndEndStations) {
  let alertMsg = "";

  if (startAndEndStations[0] === startAndEndStations[1]) {
    alertMsg = "상행 종점과 하행 종점으로 동일한 역을 선택하셨습니다.";
  }

  return alertMsg;
}

function sectionDeleteAlert() {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";
  let targetLineIdx = subwayDatas.lines.findIndex((line) => line.name === subwayDatas.targetLine);

  if (subwayDatas.lines[targetLineIdx].stops.length <= 2) {
    alertMsg = "노선에 포함된 역이 2개 이하일 때에는 삭제할 수 없습니다.";
  }

  return alertMsg;
}

function orderAlert(order) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";
  let targetLineIdx = subwayDatas.lines.findIndex((line) => line.name === subwayDatas.targetLine);

  if (isNaN(Number(order))) {
    alertMsg = "숫자만 입력 가능합니다.";
  } else if (0 > order) {
    alertMsg = "양수만 입력 가능합니다.";
  } else if (order <= 0 || subwayDatas.lines[targetLineIdx].stops.length <= order) {
    alertMsg = "역과 역 사이에만 구간 등록이 가능합니다.";
  }

  return alertMsg;
}

function sectionAlert(stationName) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";
  let targetLineIdx = subwayDatas.lines.findIndex((line) => line.name === subwayDatas.targetLine);

  if (subwayDatas.lines[targetLineIdx].stops.indexOf(stationName) !== -1) {
    alertMsg = "이미 구간에 등록된 역입니다.";
  }

  return alertMsg;
}

export { stationNameAlert, stationDeleteAlert, lineNameAlert, startAndEndStationAlert, sectionDeleteAlert, orderAlert, sectionAlert };
