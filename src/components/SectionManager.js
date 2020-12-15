import LineSelector from "./LineSelector.js";
import SectionInput from "./SectionInput.js";
import SectionList from "./SectionList.js";

export default function SectionManager({ id, $target, isShow, stations, lines, updateSection }) {
  this.$container = document.createElement("div");
  this.$container.className = "section-manager";
  $target.append(this.$container);

  this.id = id;
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

  this.onAddSection = (selectedStation, sectionOrder) => {
    const nextStations = [...this.lines[this.selectedLineIndex].stations];
    nextStations.splice(sectionOrder, 0, selectedStation);

    updateSection(this.selectedLineIndex, nextStations);
  };

  this.sectionInput = new SectionInput({
    $target: this.$container,
    stations: this.stations,
    selectedLineName: "",
    stationsInSelectedLine: [],
    onAddSection: this.onAddSection,
  });

  this.onDeleteSection = (selectedStationIndex) => {
    const nextStations = [...this.lines[this.selectedLineIndex].stations];
    nextStations.splice(selectedStationIndex, 1);

    updateSection(this.selectedLineIndex, nextStations);
  };

  this.sectionList = new SectionList({
    $target: this.$container,
    stationsInSelectedLine: [],
    onDeleteSection: this.onDeleteSection,
  });

  this.getSelectedLineName = () => {
    return this.lines[this.selectedLineIndex].name;
  };

  this.getStationsInSelectedLine = () => {
    return this.lines[this.selectedLineIndex].stations;
  };

  this.setStateComponents = () => {
    this.sectionInput.setState({
      nextSelectedLineName: this.getSelectedLineName(),
      nextStationsInSelectedLine: this.getStationsInSelectedLine(),
    });
    this.sectionList.setState(this.getStationsInSelectedLine());
  };

  this.setState = ({ nextIsShow, nextStations, nextLines, nextSelectedLineIndex }) => {
    if (nextIsShow !== undefined) {
      this.isShow = nextIsShow;
      this.stations = nextStations;
      this.sectionInput.setState({ nextStations: this.stations });
      this.render();
    }

    if (nextLines) {
      this.lines = nextLines;
      this.setStateComponents();
    }

    if (nextSelectedLineIndex) {
      this.selectedLineIndex = nextSelectedLineIndex;
      this.setStateComponents();
    }
  };

  this.render = () => {
    this.$container.style.display = this.isShow ? "block" : "none";
  };

  this.render();
}
