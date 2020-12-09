export class Data {

    static getStationNameData = () => {
        return localStorage.getItem("allStation")
    }

    static addStation = (stationName) => {
        let stationNameData = this.getStationNameData();

        if (stationNameData !== null) {
            stationNameData.push(stationName);

            return;
        }

        localStorage.setItem("allStation", stationNameData);
    }

    static removeStation = (stationName) => {
        let stationNameData = this.getStationNameData();
        stationNameData.splice(stationNameData.indexOf(stationName), 1);
        localStorage.setItem("allStation", stationNameData);
    }

    static getLineData = () => {
        return localStorage.getItem("allLine")
    }

    static addLine = (line) => {
        let lineData = this.getLineData();

        if (lineData !== null) {
            lineData.push(line);

            return;
        }

        localStorage.setItem("allStation", lineData);
    }

    static removeLine = (line) => {
        let lineData = this.getLineData();
        lineData.splice(lineData.indexOf(line), 1);
        localStorage.setItem("allStation", lineData);
    }

    static getLineSectionData = (lineName) => {
        return localStorage.getItem(lineName);
    }

    static addLineSection = (lineName, stationName, order) => {
        let lineSectionData = this.getLineSectionData(lineName);
        lineSectionData.splice(order, 0, stationName);
        localStorage.setItem(lineName, lineSectionData);
    }

    static removeLineSection = (lineName, stationName) => {
        let lineSectionData = this.getLineSectionData(lineName);
        lineSectionData.splice(lineSectionData.indexOf(stationName), 1);
        localStorage.setItem(lineName, lineSectionData);
    }


}