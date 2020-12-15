import { message } from '../../constants';

export default class StationViewEventDelegator {
  constructor(subwayMapViewModel) {
    this.stationView = null;
    this.subwayMapViewModel = subwayMapViewModel;
  }

  bindEvent(element) {
    element.addEventListener('click', this.onClick.bind(this));
  }

  bindStationView(stationView) {
    this.stationView = stationView;
  }

  onClick(event) {
    const { dataset } = event.target;

    if (dataset.purpose) {
      this[dataset.purpose](dataset);
    }
  }

  stationManager() {
    this.stationView.resetManagerContainer();
    this.stationView.renderStationManager();
  }

  addStation() {
    const stationId = this.stationView.managerContainer.querySelector('#station-name-input').value;
    this.subwayMapViewModel.addStation(stationId);

    this.stationView.resetStationTable();
    this.stationView.renderStationTable(Object.entries(this.subwayMapViewModel.getStations()));
  }

  deleteStation(dataSet) {
    if (confirm(message.ASK_WANT_TO_DELETE)) {
      this.subwayMapViewModel.deleteStation(dataSet.stationid);
      this.stationView.resetStationTable();
      this.stationView.renderStationTable(Object.entries(this.subwayMapViewModel.getStations()));
    }
  }
}
