import {
  ManagerButtonContainer,
  StationManagerContainer,
  LineManagerContainer,
  SectionManagerContainer,
  MapPrintContainer,
} from './components/index.js';
import Station from './station.js';
import Line from './line.js';
import { save, load } from './utils/index.js';

export default function SubwayMapManagement() {
  this.subwayStations = load('stations') || [];
  this.subwayLines = load('lines') || [];
  this.selectMenu = number => {
    this.selectedMenu = this.menu[number];
    this.selectedMenu.render();
  };

  this.addSubwayStation = name => {
    this.subwayStations = [...this.subwayStations, new Station({ name })];
    save('stations', this.subwayStations);
    this.selectedMenu.render();
  };

  this.deleteSubwayStation = idx => {
    this.subwayStations = [
      ...this.subwayStations.slice(0, idx),
      ...this.subwayStations.slice(idx + 1),
    ];
    save('stations', this.subwayStations);
    this.selectedMenu.render();
  };

  this.getSubwayStations = () => {
    return this.subwayStations;
  };

  this.addSubwayLine = subwayLine => {
    this.subwayLines = [...this.subwayLines, new Line(subwayLine)];
    save('lines', this.subwayLines);
    this.selectedMenu.render();
  };

  this.deleteSubwayLine = idx => {
    this.subwayLines = [
      ...this.subwayLines.slice(0, idx),
      ...this.subwayLines.slice(idx + 1),
    ];
    save('lines', this.subwayLines);
    this.selectedMenu.render();
  };

  this.getSubwayLines = () => {
    return this.subwayLines;
  };

  this.addSubwaySection = (lineIndex, orderIndex, name) => {
    this.subwayLines[lineIndex].stations = [
      ...this.subwayLines[lineIndex].stations.slice(0, orderIndex),
      new Station({ name }),
      ...this.subwayLines[lineIndex].stations.slice(orderIndex),
    ];
    save('lines', this.subwayLines);
    this.selectedMenu.renderTable();
  };

  this.deleteSubwaySection = (lineIndex, orderIndex) => {
    this.subwayLines[lineIndex].stations = [
      ...this.subwayLines[lineIndex].stations.slice(0, orderIndex),
      ...this.subwayLines[lineIndex].stations.slice(orderIndex + 1),
    ];
    save('lines', this.subwayLines);
    this.selectedMenu.renderTable();
  };

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
      deleteSection: this.deleteSubwaySection,
    }),
    new MapPrintContainer({ getLines: this.getSubwayLines }),
  ];
}

new SubwayMapManagement();
