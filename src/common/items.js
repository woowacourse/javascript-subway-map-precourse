export function removeWhiteSpaceValue(value) {
    return value.replace(/^\s+|\s+$/gm, '');
}

export function isEmpty(value) {
    return (value === "" || value === null || value === undefined || (value !== null 
        && typeof value === "object" && !Object.keys(value).length));
}

export function isDuplicateItem(itemList, value) {
    return itemList.includes(value);
}

export function getItemList(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function addItem(key, value, index) {
    let itemList = getItemList(key);
    let isComplete = false;
    // 수정 - 더 효율적으로 수정하기
    if(itemList === null){
        itemList = [];
    }
    if(!isDuplicateItem(itemList, value)){
        index = index === -1 ? itemList.length : index;
        itemList.splice(index, 0, value);
        localStorage.setItem(key, JSON.stringify(itemList));
        isComplete = true;
    }
    return isComplete;
}

export function deleteKey(key) {
    localStorage.removeItem(key);
}

export function deleteItem(key, value) {
    let itemList = getItemList(key);
    itemList.splice(itemList.indexOf(value), 1);
    localStorage.setItem(key, JSON.stringify(itemList));
}

