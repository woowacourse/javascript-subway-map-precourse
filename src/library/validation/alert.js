function stationNameAlert(inputValue) {
  return ununiqueStationNameAlert(inputValue) || spaceAlert(inputValue);
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

export { stationNameAlert };
