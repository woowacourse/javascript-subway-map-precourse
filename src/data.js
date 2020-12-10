export class Data {

    // stationRepository 접근 
    static getStationRepository = () => {
        let stationRepository = JSON.parse(localStorage.getItem("stationRepository"))
        if (stationRepository === null) {

            return {}
        }

        return stationRepository;
    }

    // stationRepository에 새로운 역 추가
    static addStation = (station) => {
        let stationRepository = this.getStationRepository();
        stationRepository[station.name] = station;

        return localStorage.setItem("stationRepository", JSON.stringify(stationRepository));
    }

    // stationRepository에 기존 역 제거
    static removeStation = (stationName) => {
        let stationRepository = this.getStationRepository();

        delete stationRepository[stationName]

        if (stationRepository === {}) {
            return localStorage.setItem("stationRepository", null)
        }

        return localStorage.setItem("stationRepository", JSON.stringify(stationRepository));
    }

    // lineRepository에 대한 접근 
    static getLineRepository = () => {
        let lineRepository = localStorage.getItem("lineRepository");

        if (lineRepository === null) {

            return {};
        }

        return JSON.parse(lineRepository);
    }

    // lineRepository에 새로운 line 추가  
    static addLine = (line) => {
        let lineRepository = this.getLineRepository();

        lineRepository[line.name] = line;

        return localStorage.setItem("lineRepository", JSON.stringify(lineRepository));
    }

    // lineRepository에 기존 line 제거
    static removeLine = (lineName) => {

        let lineRepository = this.getLineRepository();

        delete lineRepository[lineName]

        if (lineRepository === {}) {
            return localStorage.setItem("lineRepository", null);
        }

        return localStorage.setItem("lineRepository", JSON.stringify(lineRepository));
    }

}