export default function stationContainer() {
  const checkStationName = stationName => {
    console.log(stationName);
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
