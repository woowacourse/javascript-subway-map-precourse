import {getItemList} from "./items.js";
import words from "./words.js";

export const managerPart = document.getElementById("manager-part");

export function addClickEventListener(target, event) {
    target.addEventListener("click", event);
}

export function addElement(type, content, attribute, attributeName, parentNode) {
    const element = document.createElement(type);
    if(content !== null) {
        element.append(content);
    }
    if(attribute !== null) {
        element.setAttribute(attribute, attributeName);
    }
    parentNode = parentNode === null ? managerPart : parentNode;
    parentNode.append(element);
}

export function addInputElement(name, information) {
    const element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("id", name);
    element.setAttribute("placeholder", information);
    managerPart.append(element); 
}

export function addTableElement(headers, tbodyName) {
    const element = document.createElement("table");
    element.setAttribute("border", 1);
    headers.forEach(header => {
        addElement("th", header, null, null, element);
    })
    addElement("tbody", null, "id", tbodyName, element);
    managerPart.append(element);
}

export function addSelectElement(idName) {
    const stationList = getItemList(words.STATIONS);
    const element = document.createElement("select");
    element.setAttribute("id", idName);
    if(stationList !== null) {
        stationList.forEach(station => {
            const option = document.createElement("option");
            option.setAttribute("value", station);
            option.append(station);
            element.append(option);
        });
    }
    managerPart.append(element);
}

export function addClickEventInDeleteButton(buttonName, event) {
    const deleteButtons = document.getElementsByClassName(buttonName); 
    for(let i=0; i<deleteButtons.length; i++) {
        addClickEventListener(deleteButtons[i], event);
    }
}

export function pageInit() {
    managerPart.innerHTML = ""; 
}