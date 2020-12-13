import {
  ManagerButtonContainer,
  StationManagerContainer,
  LineManagerContainer,
  SectionManagerContainer,
  MapPrintContainer,
} from './components/index.js';
import Station from './station.js';

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

  this.deleteSubwayStation = () => {};

  this.getSubwayStations = () => {
    return this.subwayStations;
  };

  this.addSubwayLine = () => {};

  this.deleteSubwayLine = () => {};

  this.getSubwayLines = () => {};

  this.addSubwaySection = () => {};

  this.deleteSubwaySection = () => {};

  this.getSubwayMap = () => {};

  new ManagerButtonContainer({ selectMenu: this.selectMenu });
  this.menu = [
    new StationManagerContainer({
      addStation: this.addSubwayStation,
      getStations: this.getSubwayStations,
    }),
    new LineManagerContainer({ lines: this.subwayLines }),
    new SectionManagerContainer({ lines: this.subwayLines }),
    new MapPrintContainer({ lines: this.subwayLines }),
  ];
}

new SubwayMapManagement();
