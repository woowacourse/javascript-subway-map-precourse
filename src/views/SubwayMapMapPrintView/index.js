class MapPrintViewEventDelegation {
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
}

export default class SubwayMapMapPrintView {
  constructor(subwayMapViewModel, managerContainer, lineMapManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.lineMapManagerButton = lineMapManagerButton;
  }
}
