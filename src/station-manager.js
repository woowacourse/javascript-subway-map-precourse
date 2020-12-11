import {
    addElement, 
    addInputElement, 
    addClickEventListener, 
    pageInit,
    managerPart,
    isEmpty,
    addItem,
    removeWhiteSpaceValue
} from "./common.js";

export default class StationManager{
    constructor() {
       this.setPage();
       addClickEventListener(document.getElementById("station-add-button"), () => {this.addStation()});
    }

    setPage() {
        pageInit();
        addElement("h4", "역 이름");
        addInputElement("station-input-name", "역 이름을 입력해주세요");
        addElement("button", "역 추가", "id", "station-add-button");
        addElement("h2", "🚉 지하철 역 목록");
    }

    setAlert(stationInputName) {
        let text= "", isCorrect = true;
        if(!isEmpty(stationInputName)) {
            alert("역 이름을 입력해주세요");
            isCorrect = false;
        }
        else if(stationInputName.length < 2) {
            alert("역 이름을 2글자 이상 작성해주세요");
            isCorrect = false;
        }
        return isCorrect;
    }

    addStation() {
        const stationInputName = removeWhiteSpaceValue(document.getElementById("station-input-name").value);
        if(this.setAlert(stationInputName)) {
            addItem("stations", stationInputName);
            console.log(localStorage.getItem("stations"));
        }
    }
}