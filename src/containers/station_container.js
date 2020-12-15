import { createTr } from "../creators/station_creator";

const StationContainer = () => {
  this.appendNewTr = (station) => {
    const tr = createTr(station);
    const tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
  };
};
