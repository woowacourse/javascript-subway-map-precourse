export class Section {
    constructor(firstStation, lastStation) {
        this.stations = [];
        this.stations.push(firstStation);
        this.stations.push(lastStation);
    }

    addStation(station, position) {
        this.stations.splice(position, 0, station); 
    }

    deleteStation() {
        this.stations.splice(position, 1); 
    }
}