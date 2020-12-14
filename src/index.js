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
  this.stations = load('stations') || [];
  this.lines = load('lines') || [];

  this.selectMenu = number => {
    this.selectedMenu = this.menu[number];
    this.selectedMenu.render();
  };

  this.addStation = name => {
    this.stations = [...this.stations, new Station(name)];
    save('stations', this.stations);
    this.selectedMenu.render();
  };

  this.deleteStation = idx => {
    this.stations = [
      ...this.stations.slice(0, idx),
      ...this.stations.slice(idx + 1),
    ];
    save('stations', this.stations);
    this.selectedMenu.render();
  };

  this.getStations = () => {
    return this.stations;
  };

  this.addLine = (name, stations) => {
    this.lines = [...this.lines, new Line(name, stations)];
    save('lines', this.lines);
    this.selectedMenu.render();
  };

  this.deleteline = idx => {
    this.lines = [...this.lines.slice(0, idx), ...this.lines.slice(idx + 1)];
    save('lines', this.lines);
    this.selectedMenu.render();
  };

  this.getLines = () => {
    return this.lines;
  };

  this.addSection = (lineIndex, station, orderIndex) => {
    this.lines[lineIndex].addStation(station, orderIndex);
    save('lines', this.lines);
    this.selectedMenu.renderTable();
  };

  this.deleteSection = (lineIndex, orderIndex) => {
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
