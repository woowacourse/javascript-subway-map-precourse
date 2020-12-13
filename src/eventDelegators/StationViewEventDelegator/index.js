import { message } from '../../constants';

export default class StationViewEventDelegator {
  constructor(element, stationView, subwayMapViewModel) {
    this.stationView = stationView;
    this.subwayMapViewModel = subwayMapViewModel;
    element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    let dataSet = event.target.dataset;

    if (dataSet.purpose) {
      this[dataSet.purpose](dataSet);
    }
  }

  stationManager() {
    this.stationView.resetManagerContainer();
    this.stationView.renderStationManager();
  }

  addStation() {
    const stationId = document.getElementById('#station-name-input').value;
    this.subwayMapViewModel.addStation(stationId);

    this.stationView.resetStationTable();
    this.stationView.renderStationTable(
      Object.entries(this.subwayMapViewModel.getStations()),
    );
  }

  deleteStation(dataSet) {
    if (confirm(message.ASK_WANT_TO_DELETE)) {
      this.subwayMapViewModel.deleteStation(dataSet.stationid);
      this.stationView.resetStationTable();
      this.stationView.renderStationTable(
        Object.entries(this.subwayMapViewModel.getStations()),
      );
    }
  }
}
