import Line from './line/line.js';
import Station from './station/station.js';
import { addEventToManagerBtn } from './event.js';

export default class SubwayManagementSystem {
  constructor() {
    new Station();
    new Line();
    addEventToManagerBtn();
  }

  static selectModule(e) {
    let section;
    const modules = [
      '#station-module',
      '#line-module',
      '#section-module',
      '#map-module',
    ];
    if (e.target.id === 'station-manager-button') {
      section = document.querySelector(modules[0]);
      modules.splice(0, 1);
    } else if (e.target.id === 'line-manager-button') {
      section = document.querySelector(modules[1]);
      modules.splice(1, 1);
    } else if (e.target.id === 'section-manager-button') {
      section = document.querySelector(modules[2]);
      modules.splice(2, 1);
    } else if (e.target.id === 'map-print-manager-button') {
      section = document.querySelector(modules[3]);
      modules.splice(3, 1);
    }
    this.toggleSelectedModule(section);
    this.toggleOtherModules(modules);
  }

  static toggleSelectedModule(target) {
    if (target.style.display === 'none') {
      target.style.display = 'block';
    } else {
      target.style.display = 'none';
    }
  }

  static toggleOtherModules(modules) {
    modules.forEach((module) => {
      let section = document.querySelector(module);
      section.style.display = 'none';
    });
  }
}
