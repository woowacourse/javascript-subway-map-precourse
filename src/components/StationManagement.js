import StationNameInput from "./StationNameInput.js";

export default function StationManagement({ $target, isShow }) {
  this.$container = document.createElement("div");
  this.$container.className = "station-management";
  $target.append(this.$container);

  this.isShow = isShow;

  this.stationNameInput = new StationNameInput({ $target: this.$container });
}
