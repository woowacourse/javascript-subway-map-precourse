import DomUtils from './dom_utils.js';
import StringUtils from './string_utils.js';
import ManageStation from './manage_station.js';

export default class SubwayMap {
  constructor() {
    document.body.style.fontFamily = 'Arial';
    this._privateDomUtils = new DomUtils();
    this._privateStringUtils = new StringUtils();
    this.setIdNAme();
    this.managerButton()
    this.createMenu();
    this.handleManager();
  }

  setIdNAme() {
    this.APP = 'app';
    this.ARTICLE_AREA = 'articleArea';
    this.DO_NOT_APPEND = false;
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
      this.showArticle(articleName)
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

  handleManager() {
    new ManageStation();
  }
}

new SubwayMap();