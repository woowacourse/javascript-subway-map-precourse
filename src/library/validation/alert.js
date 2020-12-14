//역 검증 (중복, 공백, 2자 미만)
function stationNameAlert(inputValue) {
  return ununiqueStationNameAlert(inputValue) || spaceAlert(inputValue) || underTwoCharacterAlert(inputValue);
}

//중복된 역 이름 검증
function ununiqueStationNameAlert(inputValue) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";

  subwayDatas.subwayStations.map((station) => {
    if (station.name === inputValue) {
      alertMsg = "중복된 역 이름을 입력하셨습니다.";
    }
  });
  return alertMsg;
}

//공백 입력 검증
function spaceAlert(inputValue) {
  let alertMsg = "";

  if (inputValue === "") {
    alertMsg = "공백을 입력하셨습니다.";
  }
  return alertMsg;
}

//2자 미만 검증
function underTwoCharacterAlert(inputValue) {
  let alertMsg = "";

  if (inputValue.length < 2) {
    alertMsg = "2글자 이상으로 입력해주세요.";
  }
  return alertMsg;
}

//노선에 등록된 역 삭제 전 검증
function stationDeleteAlert(deleteTarget) {
  return inlineAlert(deleteTarget);
}

//노선에 포함된 역이 2개 이하일 때 삭제 시 alert
function inlineAlert(deleteTarget) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";

  subwayDatas.subwayStations.map((station, idx) => {
    if (station.name === deleteTarget && subwayDatas.subwayStations[idx].line.length >= 1) {
      alertMsg = "노선에 포함된 역은 삭제할 수 없습니다.";
    }
  });
  return alertMsg;
}

//라인 검증 (중복)
function lineNameAlert(inputValue) {
  return ununiqueLineNameAlert(inputValue) || spaceAlert(inputValue);
}

//중복된 라인 이름 검증
function ununiqueLineNameAlert(inputValue) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";

  subwayDatas.lines.map((line) => {
    if (line.name === inputValue) {
      alertMsg = "중복된 노선 이름을 입력하셨습니다.";
    }
  });
  return alertMsg;
}

//상행종점, 하행종점역 검증
function startAndEndStationAlert(startAndEndStations) {
  return unUniqueLineAlert(startAndEndStations) || sameStartAndEndStationAlert(startAndEndStations);
}

//상행 종점역과 하행 종점역이 중복되는 호선이 이미 존재하는 경우
function unUniqueLineAlert(startAndEndStations) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));

  let alertMsg = "";

  subwayDatas.lines.map((line, idx) => {
    if (line.stops[0] === startAndEndStations[0] && line.stops[line.stops.length - 1] === startAndEndStations[1]) {
      alertMsg = "상행, 하행 종점역이 중복되는 노선이 이미 존재합니다.";
    }
  });
  return alertMsg;
}

// 상행 종점역과 하행 종점역이 동일한 역인 경우 alert
function sameStartAndEndStationAlert(startAndEndStations) {
  let alertMsg = "";

  if (startAndEndStations[0] === startAndEndStations[1]) {
    alertMsg = "상행 종점과 하행 종점으로 동일한 역을 선택하셨습니다.";
  }
  return alertMsg;
}

//노선에 포함된 역이 2개 이하일 때 노선에서 제거 시 alert
function sectionDeleteAlert(targetLine) {
  let subwayDatas = JSON.parse(localStorage.getItem("subwayDatas"));
  let alertMsg = "";

  subwayDatas.lines.map((line) => {
    if (line.name === targetLine && line.stops.length <= 2) {
      alertMsg = "노선에 포함된 역이 2개 이하일 때에는 삭제할 수 없습니다.";
    }
  });
  return alertMsg;
}

export { stationNameAlert, stationDeleteAlert, lineNameAlert, startAndEndStationAlert, sectionDeleteAlert };
