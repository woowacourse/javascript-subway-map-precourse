export default class StationModel {
	getStationStorageData = () => {
		const stationData = JSON.parse(localStorage.getItem('station-data'));
		
		if (stationData === null) {
			return {};
		}
		
		return stationData;
	}

	setStationStorageData = stations => {
		localStorage.setItem('station-data', JSON.stringify(stations));
	}
}