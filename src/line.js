import { Data } from "./data.js"

export class Line {
    constructor(name, startStation, endStation) {
        this.checkLineName(name);
        this.name = name;
        this.stationArray = [startStation, endStation];
    }

    getStartStation = () => {
        return this.stationArray[0]
    }

    getEndStation = () => {
        return this.stationArray[this.stationArray.length - 1];
    }

    checkLineName = (name) => {

        if (this.isLineNameEmpty(name)) {
            throw "호선 이름을 입력해주세요."
        }

        if (this.isSameLineNameExite(name)) {
            throw "같은 이름의 호선이 있습니다."
        }

    }

    isLineNameEmpty = (name) => {
        if (name === "") {
            return true;
        }

        return false;
    }

    isSameLineNameExite = (name) => {
        if (Data.getLineRepository().hasOwnProperty(name)) {
            return true;
        }

        return false;
    }


}