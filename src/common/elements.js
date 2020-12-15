import {getItemList} from "./items.js";
import words from "./words.js";

export const managerPart = document.getElementById("manager-part");

function appendNode(childNode, parentNode) {
    parentNode = parentNode === null ? managerPart : parentNode;
    parentNode.append(childNode);
}

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
    appendNode(element, parentNode);
}

export function addInputElement(name, information, parentNode) {
    const element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("id", name);
    element.setAttribute("placeholder", information);
    appendNode(element, parentNode);
}

export function addTableElement(headers, tbodyName, parentNode) {
    const element = document.createElement("table");
    element.setAttribute("border", 1);
    headers.forEach(header => {
        addElement("th", header, null, null, element);
    })
    addElement("tbody", null, "id", tbodyName, element);
    appendNode(element, parentNode);
}

export function addSelectElement(name, parentNode) {
    const stationList = getItemList(words.STATIONS);
    const element = document.createElement("select");
    element.setAttribute("id", name);
    if(stationList !== null) {
        stationList.forEach(station => {
            const option = document.createElement("option");
            option.setAttribute("value", station);
            option.append(station);
            element.append(option);
        });
    }
    appendNode(element, parentNode);
}

export function addClickEventInButtons(buttonName, event, isNew) {
    const buttons = document.querySelectorAll(`.${buttonName}`);
    if(isNew) {
        const length = buttons.length;
        addClickEventListener(buttons[length - 1], () => {event(buttons[length-1])});
    }
    else {
        buttons.forEach(button => {
            addClickEventListener(button, () => {event(button)});
        })
    }
}

export function pageInit() {
    managerPart.innerHTML = "";
}