import { Data } from "./data.js"

export class Station {
    constructor(name) {
        this.checkStationName(name);
        this.name = name;
    }

    checkStationName = (input) => {
        if (this.isNameEmpty(input)) {
            throw "역 이름을 입력해주세요";
        }

        if (this.isNameTooShort(input)) {
            throw "역 이름은 2글자 이상이어야 합니다";
        }

        if (this.isSameNameExite(input)) {
            throw "똑같은 이름의 역이 존재합니다.";
        }
    }

    isNameEmpty = (input) => {
        if (input === "") {
            return true;
        }

        return false;
    }

    isNameTooShort = (input) => {
        if (input.length < 2) {
            return true;
        }

        return false;
    }

    isSameNameExite = (input) => {
        if (Data.getStationRepository().hasOwnProperty(input)) {
            return true;
        }

        return false;
    }
}