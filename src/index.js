import {
  ManagerButtonContainer,
  StationManagerContainer,
  LineManagerContainer,
  SectionManagerContainer,
  MapPrintContainer,
} from './components/index.js';
import { Station, Line } from './models/index.js';
import { save, load } from './utils/index.js';

export default function SubwayMapManagement() {
  this.stations = load('stations') || [];
  this.lines = load('lines') || [];

  this.setStations = stations => {
    this.stations = stations;
    save('stations', this.stations);
    this.selectedMenu.render();
  };

  this.setLines = lines => {
    this.lines = lines;
    save('lines', this.lines);
    this.selectedMenu.render();
  };

  this.selectMenu = number => {
    this.selectedMenu = this.menu[number];
    this.selectedMenu.render();
  };

  this.addStation = name => {
    this.setStations([...this.stations, new Station(name)]);
  };

  this.deleteStation = name => {
    const idx = this.stations.map(({ name }) => name).indexOf(name);
    this.setStations([
      ...this.stations.slice(0, idx),
      ...this.stations.slice(idx + 1),
    ]);
  };

  this.getStations = () => {
    return this.stations;
  };

  this.addLine = (name, stations) => {
    this.setLines([...this.lines, new Line(name, stations)]);
  };

  this.deleteline = name => {
    const idx = this.lines.map(({ name }) => name).indexOf(name);
    this.setLines([...this.lines.slice(0, idx), ...this.lines.slice(idx + 1)]);
  };

  this.getLines = () => {
    return this.lines;
  };

  this.addSection = (lineIndex, station, orderIndex) => {
    this.lines[lineIndex].addStation(station, orderIndex);
    save('lines', this.lines);
    this.selectedMenu.renderTable();
  };

  this.deleteSection = (lineIndex, name) => {
    const orderIndex = this.lines[lineIndex].stations
      .map(({ name }) => name)
      .indexOf(name);
    this.lines[lineIndex].deleteStation(orderIndex);
    save('lines', this.lines);
    this.selectedMenu.renderTable();
  };

  new ManagerButtonContainer({ selectMenu: this.selectMenu });
  this.menu = [
    new StationManagerContainer({
      getLines: this.getLines,
      getStations: this.getStations,
      addStation: this.addStation,
      deleteStation: this.deleteStation,
    }),
    new LineManagerContainer({
      getLines: this.getLines,
      getStations: this.getStations,
      addLine: this.addLine,
      deleteLine: this.deleteline,
    }),
    new SectionManagerContainer({
      getLines: this.getLines,
      getStations: this.getStations,
      addSection: this.addSection,
      deleteSection: this.deleteSection,
    }),
    new MapPrintContainer({ getLines: this.getLines }),
  ];
}

new SubwayMapManagement();
