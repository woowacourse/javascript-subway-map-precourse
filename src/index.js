import {
  ManagerButtonContainer,
  StationManagerContainer,
  LineManagerContainer,
  SectionManagerContainer,
  MapPrintContainer,
} from './components/index.js';
import Station from './station.js';
import Line from './line.js';

export default function SubwayMapManagement() {
  this.subwayStations = [];
  this.subwayLines = [];

  this.selectMenu = number => {
    this.selectedMenu = this.menu[number];
    this.selectedMenu.render();
  };

  this.addSubwayStation = name => {
    this.subwayStations = [...this.subwayStations, new Station(name)];
    this.selectedMenu.render();
  };

  this.deleteSubwayStation = idx => {
    this.subwayStations = [
      ...this.subwayStations.slice(0, idx),
      ...this.subwayStations.slice(idx + 1),
    ];
    this.selectedMenu.render();
  };

  this.getSubwayStations = () => {
    return this.subwayStations;
  };

  this.addSubwayLine = subwayLine => {
    this.subwayLines = [...this.subwayLines, new Line(subwayLine)];
    this.selectedMenu.render();
  };

  this.deleteSubwayLine = idx => {
    this.subwayLines = [
      ...this.subwayLines.slice(0, idx),
      ...this.subwayLines.slice(idx + 1),
    ];
    this.selectedMenu.render();
  };

  this.getSubwayLines = () => {
    return this.subwayLines;
  };

  this.addSubwaySection = (lineIndex, orderIndex, name) => {
    this.subwayLines[lineIndex].stations = [
      ...this.subwayLines[lineIndex].stations.slice(0, orderIndex),
      new Station(name),
      ...this.subwayLines[lineIndex].stations.slice(orderIndex),
    ];
    this.selectedMenu.renderTable();
  };

  this.deleteSubwaySection = () => {};

  this.getSubwayMap = () => {};

  new ManagerButtonContainer({ selectMenu: this.selectMenu });
  this.menu = [
    new StationManagerContainer({
      addStation: this.addSubwayStation,
      deleteStation: this.deleteSubwayStation,
      getStations: this.getSubwayStations,
      getLines: this.getSubwayLines,
    }),
    new LineManagerContainer({
      addLine: this.addSubwayLine,
      deleteLine: this.deleteSubwayLine,
      getLines: this.getSubwayLines,
      getStations: this.getSubwayStations,
    }),
    new SectionManagerContainer({
      getLines: this.getSubwayLines,
      getStations: this.getSubwayStations,
      addSection: this.addSubwaySection,
    }),
    new MapPrintContainer({ lines: this.subwayLines }),
  ];
}

new SubwayMapManagement();
