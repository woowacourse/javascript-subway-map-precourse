import { loadLineName, loadSectionStationData } from './sectionDataHandler.js';

export default class Section {
  constructor() {
    loadLineName();
    loadSectionStationData();
  }
}
