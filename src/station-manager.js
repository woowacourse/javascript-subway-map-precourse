import {
    addElement, 
    addInputElement, 
    addClickEventListener, 
    pageInit,
    managerPart
} from "./common/elements.js";
import {
    isEmpty,
    addItem,
    removeWhiteSpaceValue} 
from "./common/items.js";
import words from "./common/words.js";

export default class StationManager{
    constructor() {
       this.setPage();
       addClickEventListener(document.getElementById("station-add-button"), () => {this.addStation()});
    }

    setPage() {
        pageInit();
        addElement("h4", words.STATION_NAME);
        addInputElement(words.STATION_NAME_INPUT, words.STATION_INPUT_ALERT);
        addElement("button", words.STATION_NAME, "id",words.STATION_ADD_BUTTON);
        addElement("h2", words.STATION_LIST);
        // addTableElement([words.STATION_NAME, words.SETTING]);
    }

    setAlert(stationInputName) {
        let text= "", isCorrect = true;
        if(!isEmpty(stationInputName)) {
            alert(words.STATION_INPUT_ALERT);
            isCorrect = false;
        }
        else if(stationInputName.length < 2) {
            alert(words.STATION_LENGTH_ALERT);
            isCorrect = false;
        }
        return isCorrect;
    }

    addStation() {
        const stationInputName = removeWhiteSpaceValue(document.getElementById(words.STATION_NAME_INPUT).value);
        if(this.setAlert(stationInputName)) {
            addItem(words.STATIONS, stationInputName);
        }
    }
}