export default class MapPrintViewEventDelegator {
  constructor(subwayMapViewModel) {
    this.mapPrintView = null;
    this.subwayMapViewModel = subwayMapViewModel;
  }

  bindEvent(element) {
    element.addEventListener('click', this.onClick.bind(this));
  }

  bindMapPrintView(mapPrintView) {
    this.mapPrintView = mapPrintView;
  }

  onClick(event) {
    const { dataset } = event.target;

    if (dataset.purpose) {
      this[dataset.purpose](dataset);
    }
  }

  mapPrintManager() {
    this.mapPrintView.resetManagerContainer();
    this.mapPrintView.renderMapPrintManager();
  }
}
