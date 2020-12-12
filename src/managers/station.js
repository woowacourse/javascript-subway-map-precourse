const initStationManager = () => {
  const stationInputObj = document.createAttribute("input");
  const stationAddButtonObj = document.createAttribute("button");
  const stationDeleteButtonObj = document.createAttribute("button");

  stationInputObj.setAttribute("id", "station-name-input");
  stationAddButtonObj.setAttribute("id", "station-add-button");
  stationDeleteButtonObj.setAttribute("class", "station-delete-button");
};
