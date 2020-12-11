export default class Model {
	getStationStorageData = () => {
		const stationData = JSON.parse(localStorage.getItem('station-data'));
		
		return stationData;
	}

	setStationStorageData = stations => {
		localStorage.setItem('station-data', JSON.stringify(stations));
	}
}