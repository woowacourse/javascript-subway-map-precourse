import LineInput from "./LineInput.js";
import LineList from "./LineList.js";

export default function LineManager({ $target, isShow, stations, lines }) {
  this.$container = document.createElement("div");
  this.$container.className = "line-manager";
  $target.append(this.$container);

  this.isShow = isShow;
  this.stations = stations;
  this.lines = lines;

  this.isExistLineName = (lineName) => {
    if (this.lines.find((line) => line.name === lineName)) {
      return true;
    }

    return false;
  };

  this.lineInput = new LineInput({
    $target: this.$container,
    stations: this.stations,
    isExistLineName: this.isExistLineName,
  });

  this.lineList = new LineList({
    $target: this.$container,
    lines: this.lines,
  });

  this.setState = ({ nextIsShow }) => {
    if (nextIsShow !== undefined) {
      this.isShow = nextIsShow;
      this.render();
    }
  };

  this.render = () => {
    this.$container.style.display = this.isShow ? "block" : "none";
  };

  this.render();
}
