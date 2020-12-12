import {
  ManagerButtonContainer,
  StationManagerContainer,
  LineManagerContainer,
  SectionManagerContainer,
  MapPrintContainer,
} from './components/index.js';

export default function SubwayMapManagement() {
  this.subwayStations = [];
  this.subwayLines = [];

  this.selectMenu = number => {
    const selectedMenu = this.menu[number];
    selectedMenu.render();
  };

  this.addSubwayStation = () => {};

  this.deleteSubwayStation = () => {};

  this.getSubwayStations = () => {};

  this.addSubwayLine = () => {};

  this.deleteSubwayLine = () => {};

  this.getSubwayLines = () => {};

  this.addSubwaySection = () => {};

  this.deleteSubwaySection = () => {};

  this.getSubwayMap = () => {};

  new ManagerButtonContainer({ selectMenu: this.selectMenu });
  this.menu = [
    new StationManagerContainer({ stations: this.subwayStations }),
    new LineManagerContainer({ lines: this.subwayLines }),
    new SectionManagerContainer({ lines: this.subwayLines }),
    new MapPrintContainer({ lines: this.subwayLines }),
  ];
}

new SubwayMapManagement();
