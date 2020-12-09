export class Data {

    static getStationNameData = () => {
        let stationNameData = localStorage.getItem("allStation")
        return JSON.parse(stationNameData);
    }

    static addStation = (stationName) => {
        let stationNameData = this.getStationNameData();

        if (stationNameData !== null) {
            stationNameData.push(stationName);

            return localStorage.setItem("allStation", JSON.stringify(stationNameData));
        }

        return localStorage.setItem("allStation", JSON.stringify([stationName]));
    }

    static removeStation = (stationName) => {
        let stationNameData = this.getStationNameData();

        stationNameData.splice(stationNameData.indexOf(stationName), 1);

        if (stationNameData.length === 0) {
            return localStorage.setItem("allStation", null)
        }

        return localStorage.setItem("allStation", JSON.stringify(stationNameData));
    }

    static getLineData = () => {
        let lineData = localStorage.getItem("allLine")
        return JSON.parse(lineData);
    }

    static addLine = (line) => {
        let lineData = this.getLineData();

        if (lineData !== null) {
            lineData.push(line);

            return localStorage.setItem("allLine", JSON.stringify(lineData));
        }

        return localStorage.setItem("allLine", JSON.stringify([line]));
    }

    static removeLine = (line) => {
        let lineData = this.getLineData();

        lineData.splice(lineData.indexOf(line), 1);

        if (lineData.length === 0) {
            return localStorage.setItem("allLine", null);
        }

        return localStorage.setItem("allLine", JSON.stringify(lineData));
    }

    static getLineSectionData = (lineName) => {
        let lineSectionData = localStorage.getItem(lineName);

        return JSON.parse(lineSectionData);
    }

    static addLineSection = (lineName, stationName, order) => {
        let lineSectionData = this.getLineSectionData(lineName);

        if (lineSectionData !== null) {
            lineSectionData.splice(order, 0, stationName);

            return localStorage.setItem(lineName, JSON.stringify(lineSectionData));
        }

        return localStorage.setItem(lineName, JSON.stringify[lineSectionData]);
    }

    static removeLineSection = (lineName, stationName) => {
        let lineSectionData = this.getLineSectionData(lineName);

        lineSectionData.splice(lineSectionData.indexOf(stationName), 1);

        if (lineSectionData.length === 0) {
            return localStorage.setItem(lineName, null);
        }

        localStorage.setItem(lineName, JSON.stringify(lineSectionData));
    }


}