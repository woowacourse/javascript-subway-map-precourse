import { alertText, text, dataText } from "../text.js";
import { Data } from "../data.js";

export const checkSection = (lineName, orderInput, selectedStation) => {
    checkInput(orderInput);
    checkOrder(lineName, orderInput, selectedStation);

    return [lineName, selectedStation, orderInput];
};

export const checkStationArrayLengths = (lineName) => {
    if (isStationArrayShort(lineName)) {
        throw alertText.SHORT_STATION_ARRAY;
    }
};

const checkInput = (orderInput) => {
    if (isOrderNotInteger(orderInput)) {
        throw alertText.SECTION_ORDER_NOT_INTEGER;
    }

    if (isOrdersmallerThanZero(orderInput)) {
        throw alertText.SECTION_HAVE_TO_LARGER_THAN_ZERO;
    }

    if (isOrderEmpty(orderInput)) {
        throw alertText.EMPTY_ORDER_INPUT;
    }
};

const checkOrder = (lineName, orderInput, selectedStation) => {
    const stationArray = Data.getLineRepository()[lineName][dataText.STATION_ARRAY];

    if (isNeighborStationSame(stationArray, Number(orderInput), selectedStation)) {
        throw alertText.NEIGHBOR_STATION_SAME;
    }

    if (isOrderOutOfIndex(stationArray, orderInput)) {
        throw alertText.OUT_OF_INDEX;
    }
};

const isOrderNotInteger = (orderInput) => {
    return Number(orderInput) !== parseInt(Number(orderInput));
};

const isOrdersmallerThanZero = (orderInput) => {
    return Number(orderInput) < text.ZERO;
};

const isOrderEmpty = (orderInput) => {
    return orderInput.trim() === text.EMPTY;
};

const isNeighborStationSame = (stationArray, orderInput, selectedStation) => {
    return (stationArray[orderInput - text.ONE] === selectedStation || stationArray[orderInput] === selectedStation);
};

const isOrderOutOfIndex = (stationArray, orderInput) => {
    return orderInput > stationArray.length;
};

const isStationArrayShort = (lineName) => {
    return Data.getLineRepository()[lineName][dataText.STATION_ARRAY].length <= text.MINIMUM_STATION_ARRAY_LENGTH;
};
