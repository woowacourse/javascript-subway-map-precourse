import { isValidStationName } from "../utils";

export default function stationContainer() {
  let stationList = [];

  const checkStationName = stationName => {
    isValidStationName(stationList, stationName)
      ? addStation(stationName)
      : alert("지하철 역이 중복되지 않게 2글자 이상으로 입력해주세요.");
  };

  const addStation = stationName => {
    stationList.push(stationName);
    console.log(stationList);
  };

  const init = () => {
    const stationContainer = document.querySelector(
      "#station-manager-container",
    );
    const submitButton = document.querySelector("#station-name-button");
    const stationNameInput = document.querySelector("#station-name-input");

    stationContainer.style.display = "block";
    submitButton.addEventListener("click", () => {
      checkStationName(stationNameInput.value);
      stationNameInput.value = "";
    });
  };

  init();
}
