import {addElement, pageInit} from "../common/elements.js";
import words from "../common/words.js";

export function setPage() {
    pageInit();
    addElement("div", null, "class", words.MAP, null);
}