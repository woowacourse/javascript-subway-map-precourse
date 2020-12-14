export default class MapPrintViewEventDelegator {
  constructor(mapPrintView, subwayMapViewModel) {
    this.mapPrintView = mapPrintView;
    this.subwayMapViewModel = subwayMapViewModel;
  }

  bindEvent(element) {
    element.addEventListener('click', this.onClick.bind(this));
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
