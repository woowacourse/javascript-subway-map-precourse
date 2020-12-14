import Line from './line/line.js';
import Station from './station/station.js';
import {
  addEventToCreateSectionBtn,
  addEventToManagerBtn,
} from './util/events.js';
import StationInLine from './section/section.js';
import {
  hideSectionManager,
  refreshLineNameBtn,
} from './section/sectionElemGenerator.js';
import { refreshLineModule } from './line/lineElemGenerator.js';
import { refreshMapData } from './util/output.js';

export default class SubwayManagementSystem {
  constructor() {
    new Station();
    new Line();
    new StationInLine();
    addEventToManagerBtn();
    addEventToCreateSectionBtn();
  }

  static selectModule(e) {
    let selector;
    hideSectionManager();
    if (e.target.id === 'station-manager-button') {
      selector = '#station-module';
    } else if (e.target.id === 'line-manager-button') {
      selector = '#line-module';
      refreshLineModule();
    } else if (e.target.id === 'section-manager-button') {
      selector = '#section-module';
      refreshLineNameBtn();
    } else if (e.target.id === 'map-print-manager-button') {
      selector = '#map-module';
      refreshMapData();
    }
    this.toggleSelectedModule(selector);
  }

  static toggleSelectedModule(selector) {
    const target = document.querySelector(selector);
    if (target.style.display === 'none') {
      target.style.display = 'block';
    } else {
      target.style.display = 'none';
    }
    this.toggleOtherModules(selector);
  }

  static toggleOtherModules(selector) {
    const modules = [
      '#station-module',
      '#line-module',
      '#section-module',
      '#map-module',
    ];
    const idx = modules.indexOf(selector);
    modules.splice(idx, 1);
    modules.forEach((module) => {
      let section = document.querySelector(module);
      section.style.display = 'none';
    });
  }

  static clearInput(elem) {
    elem.value = '';
    elem.focus();
  }
}
