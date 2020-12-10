import { Data } from "../data.js"

export const getInputIfPossible = () => {
    const stationNameInput = document.querySelector("#station-name-input");
    checkStationName(stationNameInput);
    return stationNameInput.value;
}

const checkStationName = (input) => {
    if (isNameEmpty(input)) {
        throw "역 이름을 입력해주세요";
    }

    if (isNameTooShort(input)) {
        throw "역 이름은 2글자 이상이어야 합니다";
    }

    if (isSameNameExite(input)) {
        throw "똑같은 이름의 역이 존재합니다.";
    }
}

const isNameEmpty = (input) => {
    if (input.value === "") {
        return true;
    }

    return false;
}

const isNameTooShort = (input) => {
    if (input.value.length < 2) {
        return true;
    }

    return false;
}

const isSameNameExite = (input) => {
    if (Data.getStationNameData().includes(input.value)) {
        return true;
    }

    return false;
}