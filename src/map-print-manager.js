import {setPage} from "./View/map-print-manager-view.js";
import {addElement} from "./common/elements.js";
import {getItemList} from "./common/items.js";
import words from "./common/words.js";

export default class MapPrintManager {
    constructor() {
        setPage();
        this.map = document.querySelector(`.${words.MAP}`);
        this.printMap();
    }

    setMapContent(line) {
        const sectionList = getItemList(line);
        sectionList.forEach(section => {
            addElement("li", section, null, null, this.map);
        })
    }

    printMap() {
        const lineList = getItemList(words.LINES);
        lineList.forEach(line => {
            addElement("h3", line, null, null, this.map);
            this.setMapContent(line);
        });
    }
}