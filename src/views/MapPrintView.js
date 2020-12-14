export default class MapPrintView {
  constructor(lineList) {
    this.elements = {
      managerContainer: document.querySelector('#manager-container'),
    };

    this.lineList = lineList;
    this.showMapPrintManager();
  }

  showMapPrintManager() {
    this.elements.managerContainer.innerHTML = `<div class="map" />`;
    const mapElement = document.querySelector('.map');

    mapElement.innerHTML = this.lineList
      .map((line) => {
        let generatedDOM = `
          <h3>${line.name}</h3>
          <ul>
        `;
        generatedDOM += line.sectionList.map((section) => `<li>${section.name}</li>`).join('');
        generatedDOM += `</ul>`;

        return generatedDOM;
      })
      .join('');
  }
}
