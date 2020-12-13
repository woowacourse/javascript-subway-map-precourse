export default class MapPrintViewEventDelegator {
  constructor(element, mapPrintView, subwayMapViewModel) {
    this.mapPrintView = mapPrintView;
    this.subwayMapViewModel = subwayMapViewModel;
    element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    let dataSet = event.target.dataset;

    if (dataSet.purpose) {
      this[dataSet.purpose](dataSet);
    }
  }

  mapPrintManager() {
    this.mapPrintView.resetManagerContainer();
    this.mapPrintView.renderMapPrintManager();
  }
}
