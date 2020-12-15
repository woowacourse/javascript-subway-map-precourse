import LineSelector from "./LineSelector.js";
import SectionInput from "./SectionInput.js";
import SectionList from "./SectionList.js";

export default function SectionManager({ $target, isShow, stations, lines }) {
  this.$container = document.createElement("div");
  this.$container.className = "section-manager";
  $target.append(this.$container);

  this.isShow = isShow;
  this.stations = stations;
  this.lines = lines;
  this.selectedLineIndex = -1;

  this.onChangeLine = (nextSelectedLineIndex) => {
    this.setState({ nextSelectedLineIndex });
  };

  this.lineSelector = new LineSelector({
    $target: this.$container,
    lines: this.lines,
    onChangeLine: this.onChangeLine,
  });
  this.sectionInput = new SectionInput({
    $target: this.$container,
    stations: this.stations,
    selectedLineName: "",
  });
  this.sectionList = new SectionList({
    $target: this.$container,
    stationsInSelectedLine: [],
  });

  this.getSelectedLineName = () => {
    return this.lines[this.selectedLineIndex].name;
  };

  this.getStationsInSelectedLine = () => {
    return this.lines[this.selectedLineIndex].stations;
  };

  this.setState = ({ nextIsShow, nextSelectedLineIndex }) => {
    if (nextIsShow !== undefined) {
      this.isShow = nextIsShow;
      this.render();
    }

    if (nextSelectedLineIndex) {
      this.selectedLineIndex = nextSelectedLineIndex;
      this.sectionInput.setState(this.getSelectedLineName());
      this.sectionList.setState(this.getStationsInSelectedLine());
    }
  };

  this.render = () => {
    this.$container.style.display = this.isShow ? "block" : "none";
  };

  this.render();
}
