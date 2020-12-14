import { Data } from "../component/data.js"
import { alertText, text } from "../component/text.js"
import { Line } from "../component/line.js"

export const makeLineIfPossible = (name, startStation, endStation) => {

    if (isEmptyLineName(name)) {
        throw alertText.EMPTY_LINE_NAME;
    }

    if (isSameLineExite(name)) {
        throw alertText.SAME_LINE_EXITE;
    }

    if (isStartStationEndStationSame(startStation, endStation)) {
        throw alertText.START_STATION_SAME_WHIT_END_STATION;
    }

    return new Line(name, startStation, endStation);
};

const isEmptyLineName = (input) => {
    return input.trim() === text.EMPTY;
};

const isSameLineExite = (input) => {
    return Data.getLineRepository().hasOwnProperty(input);
};

const isStartStationEndStationSame = (startStation, endStation) => {
    return startStation === endStation;
};