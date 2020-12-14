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

function stationDeleteAlert(deleteTarget) {
  return inlineAlert(deleteTarget);
  //노선에 등록된 역 삭제 시 alert
  //노선에 포함된 역이 2개 이하일 때 삭제 시 alert
}

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

//라인 검증
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

export { stationNameAlert, stationDeleteAlert, lineNameAlert };
