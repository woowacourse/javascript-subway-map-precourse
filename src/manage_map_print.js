import DomUtils from './dom_utils.js';

export default class ManageMapPrint {
  emptyArticle(articleName) {
    const mapArticle = document.getElementById(articleName);

    mapArticle.innerHTML = '';
  }
  
  displayMapPrint(articleName, commonUtils) {
    const mapClass = this.createMapDiv(articleName);
    const lineList = commonUtils.getLocalStorageLine(); 

    for (const line in lineList) {
      commonUtils.createTitle('h3', line, mapClass);
      commonUtils.createUnorderedList(lineList[line], mapClass);
    }
  }

  createMapDiv(articleName) {
    const domUtils = new DomUtils();
    const mapDiv = document.createElement('div');
    
    domUtils.setAttribute('class', mapDiv, 'map');
    domUtils.setAttribute('id', mapDiv, 'map');
    domUtils.appendToIdName(articleName, mapDiv);

    return 'map';
  }
}