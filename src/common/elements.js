export const managerPart = document.getElementById("manager-part");

export function addClickEventListener(target, listener) {
    target.addEventListener("click", listener);
}

export function addElement(type, content, attribute, attributeName, parentNode) {
    const element = document.createElement(type);
    element.append(content);
    element.setAttribute(attribute, attributeName);
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

export function addTableElement(idName) {
    const element = document.createElement("table");
    element.setAttribute("id", idName);
    element.setAttribute("border", 1);
    managerPart.append(element);
}

export function pageInit() {
    managerPart.innerHTML = ""; 
}