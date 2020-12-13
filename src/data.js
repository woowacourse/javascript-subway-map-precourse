import { dataText } from "./text.js"

export class Data {
    // stationRepository 접근 
    static getStationRepository = () => {
        let stationRepository = JSON.parse(localStorage.getItem(dataText.STATION_REPOSITORY))
        if (stationRepository === null) {
            return {};
        }

        return stationRepository;
    }

    // stationRepository에 새로운 역 추가
    static addStation = (station) => {
        let stationRepository = this.getStationRepository();
        stationRepository[station.name] = station;

        return localStorage.setItem(dataText.STATION_REPOSITORY, JSON.stringify(stationRepository));
    }

    // stationRepository에 기존 역 제거
    static removeStation = (stationName) => {
        let stationRepository = this.getStationRepository();

        delete stationRepository[stationName]

        if (stationRepository === this.EMPTY_REPOSITORY) {
            return localStorage.setItem(dataText.STATION_REPOSITORY, null)
        }

        return localStorage.setItem(dataText.STATION_REPOSITORY, JSON.stringify(stationRepository));
    }

    // lineRepository에 대한 접근 
    static getLineRepository = () => {
        let lineRepository = localStorage.getItem(dataText.LINE_REPOSITORY);

        if (lineRepository === null) {
            return {};
        }

        return JSON.parse(lineRepository);
    }

    // lineRepository에 새로운 line 추가  
    static addLine = (line) => {
        let lineRepository = this.getLineRepository();
        lineRepository[line.name] = line;

        return localStorage.setItem(dataText.LINE_REPOSITORY, JSON.stringify(lineRepository));
    }

    // lineRepository에 기존 line 제거
    static removeLine = (lineName) => {

        let lineRepository = this.getLineRepository();

        delete lineRepository[lineName]

        if (lineRepository === this.EMPTY_REPOSITORY) {
            return localStorage.setItem(dataText.LINE_REPOSITORY, null);
        }

        return localStorage.setItem(dataText.LINE_REPOSITORY, JSON.stringify(lineRepository));
    }

    // 특정line에 새로운 역을 삽입
    static insertStationToLine = (lineName, stationName, order) => {
        let lineRepository = this.getLineRepository();

        lineRepository[lineName][dataText.STATION_ARRAY].splice(order, 0, stationName);

        localStorage.setItem(dataText.LINE_REPOSITORY, JSON.stringify(lineRepository));
    }

    // 특정line에 기존 역을 삭제
    static removeStationFromLine = (lineName, order) => {
        let lineRepository = this.getLineRepository()

        lineRepository[lineName][dataText.STATION_ARRAY].splice(order, 1)

        localStorage.setItem(dataText.LINE_REPOSITORY, JSON.stringify(lineRepository));
    }
}