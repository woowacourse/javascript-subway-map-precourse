import { Data } from "./data.js"
import { alertText, text } from "./text.js"
import { Station } from "./station.js"

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

const isEmptyName = (input) => {
    return hasEmptyName(input);
}

const hasEmptyName = (input) => {
    return input === text.EMPTY;
}

const isShortName = (input) => {
    return hasShortName(input);
}

const hasShortName = (input) => {
    return input.length < text.MINIMUM_STATION_LENGTH;
}

const isSameNameExite = (input) => {
    return hasSameName(input);
}

const hasSameName = (input) => {
    return Data.getStationRepository().hasOwnProperty(input);
}

const 