import { Data } from "../data.js"
import { alertText, text } from "../text.js"
import { Station } from "../station.js"

export const makeStationIfPossible = (input) => {
    if (isEmptyName(input)) {
        throw alertText.EMPTY_STATION_NAME;
    }

    if (isShortName(input)) {
        throw alertText.SHORT_STATION_NAME;
    }

    if (isSameNameExite(input)) {
        throw alertText.SAME_STATION_EXITE;
    }

    return new Station(input);
}

export const checkStationInLine = (input) => {
    if (isStationInLine(input)) {
        throw alertText.STATION_ALREADY_IN_LINE;
    }
}

const isEmptyName = (input) => {
    return input.trim() === text.EMPTY;
}

const isShortName = (input) => {
    return input.length < text.MINIMUM_STATION_LENGTH;
}

const isSameNameExite = (input) => {
    return Data.getStationRepository().hasOwnProperty(input);
}

const isStationInLine = (station) => {
    return Object.values(Data.getLineRepository())
        .map((line) => line.stationArray)
        .some((stationArray) => stationArray.includes(station))
}
