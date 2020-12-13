import { Data } from "../data.js"
import { alertText, text } from "../text.js"
import { Line } from "../line.js"

export const makeLineIfPossible = (name, startStation, endStation) => {

    if (isEmptyLineName(name)) {
        throw alertText.EMPTY_LINE_NAME;
    }

    if (isSameLineExite(name)) {
        throw alertText.SAME_LINE_EXITE;
    }

    return new Line(name, startStation, endStation);
}

const isEmptyLineName = (input) => {
    return hasEmptyLineName(input)
}

const hasEmptyLineName = (input) => {
    return input.trim() === text.EMPTY;
}

const isSameLineExite = (input) => {
    return hasSameLine(input);
}

const hasSameLine = (input) => {
    return Data.getLineRepository().hasOwnProperty(input)
}