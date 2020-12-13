export default class Line {
	constructor(lineName, startStation, endStation) {
		this.lineName = lineName;
		this.lineStations = [startStation, endStation];
	}
}