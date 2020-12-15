import DomUtils from './dom_utils.js';
import StringUtils from './string_utils.js';
import TableUtils from './table_utils.js';
import CommonUtils from './common_utils.js';
import ManageLine from './manage_line.js';
import SelectUtils from './select_utils.js';
import ManageMapPrint from './manage_map_print.js';
import ManageSection from './manage_section.js';

export default class Menu {
  constructor() {
    this._privateDomUtils = new DomUtils();
    this._privateStringUtils = new StringUtils();
    this._privateTableUtils = new TableUtils();
    this._privateCommonUtils = new CommonUtils();
    this._privateSelectUtils = new SelectUtils();
    this.setIdNAme();
    this.managerButton();
    this.createMenu();
  }

  setIdNAme() {
    this.APP = 'app';
    this.ARTICLE_AREA = 'articleArea';
    this.DO_NOT_APPEND = false;

    this.STATION_ARTICLE = 'stationArticle';
    this.LINE_ARTICLE = 'lineArticle';
    this.SECTION_ARTICLE = 'sectionArticle';
    this.MAP_PRINT_ARTICLE = 'mapArticle';

    this.LINE_BUTTON_CLASS = 'line-button'
  }

  managerButton() {
    this._managerButton = {
      'station-manager-button': '1. 역 관리',
      'line-manager-button': '2. 노선 관리',
      'section-manager-button': '3. 구간 관리',
      'map-print-manager-button': '4. 지하철 노선도 출력',
    }
  }

  createMenu() {
    this.createArticleArea();
    for (const idName in this._managerButton) {
      const varName = this.createMenuButton(idName);
      const articleName = this.createMenuArticle(idName);
      this.addEventToButton(varName, articleName);
    }
  }

  createArticleArea() {
    this._articleArea = this._privateDomUtils.createArticle(this.APP, this.ARTICLE_AREA);
  }

  createMenuButton(idName) {
    const varName = this._privateStringUtils.getVarName(idName);

    this[`_${varName}`] = this._privateDomUtils.createButton(idName, this._managerButton[idName]);
    this._privateDomUtils.appendBefore(this.APP, this[`_${varName}`], this._articleArea);

    return varName;
  }

  createMenuArticle(idName) {
    const articleName = this._privateStringUtils.getArticleName(idName);
    
    this[`_${articleName}`] = this._privateDomUtils.createArticle(this.ARTICLE_AREA, articleName);
    this._privateDomUtils.displayNone(this[`_${articleName}`]);

    return articleName;
  }

  addEventToButton(varName, articleName) {
    this[`_${varName}`].addEventListener('click', () => {
      this.showArticle(articleName);
      this.refreshArticle(articleName);
    });
  }

  showArticle(articleName) {
    this.hideAllArticle();
    this.showCorrespondingArticle(articleName);
  }

  hideAllArticle() {
    for (let i = 0; i < 4; i++) {
      this._articleArea.children[i].style.display = 'none'
    }
  }

  showCorrespondingArticle(articleName) {
    this[`_${articleName}`].style.display = 'block';
  }

  refreshArticle(articleName) {
    if (articleName === this.STATION_ARTICLE) {
      this.refreshStationArticle(articleName);
    }
    else if (articleName === this.LINE_ARTICLE) {
      this.refreshLineSelect();
      this._privateTableUtils.refreshTableData(articleName);
    }
    else if (articleName === this.SECTION_ARTICLE) {
      this.refreshSectionLineButtons();
    }
    else if (articleName === this.MAP_PRINT_ARTICLE) {
      this.refreshMapPrint(articleName);
    }
  }

  refreshStationArticle(articleName) {
    this._privateTableUtils.emptyTableData(articleName);
    this._privateTableUtils.initStationTableData(articleName);
  }

  refreshLineSelect() {
    const startSelect = document.getElementById('line-start-station-selector');
    const endSelect = document.getElementById('line-end-station-selector');
    

    startSelect.innerHTML = '';
    endSelect.innerHTML = '';

    this._privateSelectUtils.addStationsToSelect(startSelect, this._privateCommonUtils, this._privateDomUtils);
    this._privateSelectUtils.addStationsToSelect(endSelect, this._privateCommonUtils, this._privateDomUtils);
    
  }

  refreshSectionLineButtons() {
    this.removeButtons();
    
    const manageSection = new ManageSection();

    manageSection.createLineButtons();
    manageSection.hideManageLineSection();
  }

  removeButtons() {
    const buttonArray = document.querySelectorAll(`.${this.LINE_BUTTON_CLASS}`);
    const len = buttonArray.length

    for (let i = 0; i < len; i++) {
      document.querySelector(`.${this.LINE_BUTTON_CLASS}`).remove();
    }
  }

  refreshMapPrint(articleName) {
    const manageMapPrint = new ManageMapPrint();

    manageMapPrint.emptyArticle(articleName);
    manageMapPrint.displayMapPrint(articleName, this._privateCommonUtils);
  }



}