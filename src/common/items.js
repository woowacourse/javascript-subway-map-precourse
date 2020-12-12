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
        isDuplicate = true;
    }
    return isDuplicate;
}

export function getItemList(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function addItem(key, value) {
    let itemList = getItemList(key);
    let isComplete = false;
    // 수정 - 더 효율적으로 수정하기
    if(itemList === null){
        itemList = [];
    }
    if(!itemDuplicateCheck(itemList, value)){
        itemList.push(value);
        localStorage.setItem(key, JSON.stringify(itemList));
        isComplete = true;
    }
    return isComplete;
}