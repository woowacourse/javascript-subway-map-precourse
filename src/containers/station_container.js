import { createTr } from "../creators/station_creator";

const StationContainer = function () {
  this.appendNewTr = (station) => {
    const tr = createTr(station);
    const tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
  };

  this.clearInputValue = (input) => {
    input.value = "";
  };

  this.removeTr = (targetButton) => {
    const tr = targetButton.parentElement.parentElement;
    const tbody = tr.parentElement;
    tbody.removeChild(tr);
  };
};

export const {
  appendNewTr,
  clearInputValue,
  removeTr,
} = new StationContainer();
