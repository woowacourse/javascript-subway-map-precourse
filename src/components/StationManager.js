import StationNameInput from "./StationNameInput.js";
import StationList from "./StationList.js";

export default function StationManager({ $target, isShow }) {
  this.$container = document.createElement("div");
  this.$container.className = "station-management";
  $target.append(this.$container);

  this.isShow = isShow;

  this.stationNameInput = new StationNameInput({ $target: this.$container });
  this.stationList = new StationList({ $target: this.$container });
}
