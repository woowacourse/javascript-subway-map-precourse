export default class SubwayMap {
  constructor() {
    this.createMenuButton();
  }

  createMenuButton() {
    this._managerButton = {
      'station-manager-button': '1. 역 관리',
      'line-manager-button': '2. 노선 관리',
      'section-manager-button': '3. 구간 관리',
      'map-print-manager-button': '4. 지하철 노선도 출력',
    }
    
    for (const tagName in this._managerButton) {
      let varName = this.getVarName(tagName);
      
      this[`_${varName}`] = this.createButton();
      this.setAttribute(varName, tagName);
      this.setInnerHtml(varName, tagName);
      this.appendToApp(varName);
      // this.addEventListenr(tagName);
      let articleName = this.getArticleName(tagName);
      this[`_${articleName}`] = this.createArticle();
      // this.addEventListenr(type);
    }
  }

  getVarName(tagName) {
    let tagParts = this.splitTagName(tagName);
    let varNameParts = this.intoCamelCase(tagParts);

    return varNameParts.join('');
  }

  splitTagName(tagName) {
    return tagName.split('-');
  }

  intoCamelCase(tagParts) {
    let varNameParts = [];

    tagParts.forEach((part) => {
      varNameParts.push(this.capitalize(part, tagParts));
    })

    return varNameParts;
  }

  capitalize(string, tagParts) {
    if (tagParts.indexOf(string) >= 1) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return string
  }

  createButton() {
    return document.createElement('button');
  }

  setAttribute(varName, tagName) {
    this[`_${varName}`].setAttribute('id', tagName);
  }

  setInnerHtml(varName, tagName) {
    this[`_${varName}`].innerHTML = this._managerButton[tagName]
  }

  appendToApp(varName) {
    document.getElementById('app').appendChild(this[`_${varName}`]);
  }

  createArticle() {
    return document.createElement('ARTICLE');
  }

  getArticleName(tagName) {
    const tagParts = this.splitTagName(tagName);

    return `${tagParts[0]}Article`;
  }

  // addEventListenr(type) {
  //   this[`_${type}ManagerButton`].addEventListenr('click', () => {
  //     this.getArticle(type);
  //   })
  // }

  // getArticle(type) {

  // }
}

new SubwayMap();