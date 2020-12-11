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

export function pageInit() {
    managerPart.innerHTML = ""; 
}

export function removeWhiteSpaceValue(value) {
    return value.replace(/^\s+|\s+$/gm, '');
}

export function isEmpty(value) {
    let result = true;
    if(value === "" || value === null || value === undefined || (value !== null 
        && typeof value === "object" && !Object.keys(value).length)) {
        result = false;
    }
    return result;
}

export function itemDuplicateCheck(itemList, value) {
    let isDuplicate = false;
    if(itemList.includes(value)) {
        alert(`${value}은 이미 등록된 이름입니다`);
        isDuplicate = true;
    }
    return isDuplicate;
}

export function getItemList(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function addItem(key, value) {
    let itemList = getItemList(key);
    // 수정 - 더 효율적으로 수정하기
    if(itemList === null){
        itemList = [];
    }
    if(!itemDuplicateCheck(itemList, value)){
        itemList.push(value);
        localStorage.setItem(key, JSON.stringify(itemList));
    }
}