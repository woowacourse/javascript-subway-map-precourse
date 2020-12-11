export const managerPart = document.getElementById("manager-part");

export function addClickEventListener(target, listener) {
    target.addEventListener("click", listener);
}

export function addElement(type, content, attribute, attributeName) {
    const element = document.createElement(type);
    element.append(content);
    element.setAttribute(attribute, attributeName);
    managerPart.append(element);
}

export function addInputElement(name, information) {
    const element = document.createElement("input");
    element.setAttribute("type", "text");
    element.setAttribute("id", name);
    element.setAttribute("placeholder", information);
    managerPart.append(element); 
}

// export function addTableElement(name, )

export function pageInit() {
    managerPart.innerHTML = ""; 
}