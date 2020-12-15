export default function lineContainer() {
  let lineList = [];

  const checkLineName = lineName => {
    console.log(lineName);
  };

  const setSelectorOption = selector => {
    const stationData = JSON.parse(window.localStorage.getItem("stationList"));
    if (stationData) {
      for (const station of stationData) {
        const selectorOption = document.createElement("option");
        selectorOption.textContent = station;
        selector.appendChild(selectorOption);
      }
    }
  };

  const init = () => {
    const lineNameContainer = document.querySelector("#line-manager-container");
    const lineNameInput = document.querySelector("#line-name-input");
    const lineStartSelector = document.querySelector(
      "#line-start-name-selector",
    );
    const lineEndSelector = document.querySelector("#line-start-end-selector");
    const lineNameButton = document.querySelector("#line-name-button");

    setSelectorOption(lineStartSelector);
    setSelectorOption(lineEndSelector);
    lineNameContainer.style.display = "block";
    lineNameButton.addEventListener("click", () => {
      checkLineName(lineNameInput.value);
    });
  };

  init();
}
