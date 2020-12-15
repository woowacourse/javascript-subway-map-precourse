import Role from './role.js';
import { roleInterface } from './role_interface.js';
import {
  ACTIVE,
  MAP,
  MAP_PRINT_MANAGER,
  MAP_PRINT_MANAGER_BUTTON,
  MAP_PRINT_MANAGER_K,
} from '../library/constant/constant.js';
import { nodeSelector } from '../util/selector/node_selector.js';

export default class MapPrintManager extends Role {
  constructor() {
    super(MAP_PRINT_MANAGER, MAP_PRINT_MANAGER_BUTTON, MAP_PRINT_MANAGER_K);
    this.initialize();
  }

  initialize() {
    this.printMap();
  }

  printMap() {
    roleInterface.clearNode(MAP_PRINT_MANAGER);
    for (const lineInfo of roleInterface.getLineInfos()) {
      if (!lineInfo) {
        continue;
      }
      const mapSection = nodeSelector.selectId(MAP_PRINT_MANAGER);
      const line = Object.keys(lineInfo)[0];
      const sections = Object.values(lineInfo)[0];
      const map = this.getMap(line, sections);

      mapSection.append(map);
    }
    roleInterface.displayContent(MAP, ACTIVE);
  }

  getMap(line, sections) {
    const map = document.createElement('div');
    const heading = document.createElement('h3');
    const list = this.getSectionList(sections);

    map.className = MAP;
    heading.append(line);
    map.append(heading, list);

    return map;
  }

  getSectionList(sections) {
    const list = document.createElement('ul');
    const item = document.createElement('li');

    sections.forEach(section => {
      item.innerHTML = section;
      list.append(item.cloneNode(true));
    });

    return list;
  }
}
