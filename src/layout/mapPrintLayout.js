/**
 * 지하철 노선도 출력과 관련된 레이아웃을 관리하는 모듈
 */

import { MAP_MANAGER_BUTTON } from '../common/constants.js';
import PageLayout from './pageLayout.js';

export default class MapPrintLayout extends PageLayout {
  constructor(controller) {
    super(controller);
    this.elements = this.createElements(); // elemenet와 Child 저장
    this.liTemplate = this.createLiTemplate();
    this.resultMapTemplate = this.createResultMapTemplate();
    this.rendered = this.$render(this.elements.section);
  }

  // override
  createElements() {
    const elements = super.$createCommonElements();
    this.$appendChildElement(
      elements.section,
      'resultContainer',
      this.$createResultContainer(),
    );

    return elements;
  }

  createManagerButton() {
    return this.createElement({
      tag: 'button',
      id: 'map-print-manager-button',
      innerHTML: MAP_MANAGER_BUTTON,
      eventListener: { click: [() => this.handleManagerButton()] },
    });
  }

  $createResultContainer() {
    const element = this.createElement({ tag: 'article' });
    return this.$createElementNode(element);
  }

  createResultTitle(text) {
    return this.createElement({
      tag: 'h2',
      innerHTML: text,
    });
  }

  createResultMap(lineName) {
    const clone = this.resultMapTemplate.content.cloneNode(true);
    const div = clone.querySelector('div');
    const title = clone.querySelector('h2');
    const ul = clone.querySelector('ul');
    const liList = this.loadLiData(lineName);
    ul.append(...liList);
    title.innerHTML = lineName;
    div.append(title, ul);
    return div;
  }

  // override
  refreshResultData() {
    const lineListAll = this.controller.getLineListAll();
    this.rendered.querySelector('article').innerHTML = '';
    const mapList = lineListAll.map(lineList =>
      this.createResultMap(lineList[0].line),
    );
    this.rendered.querySelector('article').append(...mapList);
  }

  createResultMapTemplate() {
    return this.createElement({
      tag: 'template',
      id: 'station-map',
      innerHTML: '<div class="map"><h2></h2><ul></ul></div>',
    });
  }

  // override
  createLiTemplate() {
    return this.createElement({
      tag: 'template',
      id: 'station-li',
      innerHTML: '<li></li>',
    });
  }

  createLi(stationName) {
    return this.createElement({
      tag: 'li',
      innerHTML: stationName,
    });
  }

  loadLiData(lineName) {
    const lineList = this.controller.getLineList(lineName); // 1차원
    const liList = lineList.map(station => this.createLi(station.name));
    return liList;
  }
}
