import Station from './station/station.js';
import Line from './line/line.js';
import { refreshLineModule } from './line/lineElemGenerator.js';
import StationInLine from './section/section.js';
import {
  hideSectionManager,
  refreshSectionModule,
} from './section/sectionElemGenerator.js';
import {
  addEventToCreateSectionBtn,
  addEventToManagerBtn,
} from './util/events.js';
import { refreshMapModule } from './util/output.js';

export default class SubwayManager {
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
      refreshSectionModule();
    } else if (e.target.id === 'map-print-manager-button') {
      selector = '#map-module';
      refreshMapModule();
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

  static confirmMessage(msg) {
    return confirm(`정말로 ${msg}하시겠습니까?`);
  }

  static clearInput(elem) {
    elem.value = '';
    elem.focus();
  }
}
