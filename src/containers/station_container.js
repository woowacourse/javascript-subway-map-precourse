import { createTr } from "../creators/station_creator";

const StationContainer = () => {
  this.appendNewTr = (station) => {
    const tr = createTr(station);
    const tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
  };

  this.clearInputValue = (input) => {
    input.value = "";
  };
};

export const { appendNewTr, clearInputValue } = new StationContainer();
