import { addOption, addSelectButton, showContents, printLineList } from './view.js'
import { isInLine, isValidNumber, isValidArrayLength, removeStation } from '../check.js'

const getLineStations = function(lineName) {
  let objects = JSON.parse(localStorage.getItem("line"));
  let i;
  for (i = 0; i < objects.length; i++) {
    if (objects[i].name === lineName) {
      return objects[i].line
    }
  }
}

const deleteStation = function(stationName, lineName) {
  if (isValidArrayLength("line", lineName)) {
    const deleteTarget = document.querySelector(`#${stationName}`);
    const stationList = getLineStations(lineName);
    deleteTarget.remove();
    removeStation("line", stationName, lineName, stationList)
  } else {
    const alertText = "노선에 포함된 역이 두 개 이하일 경우에는 삭제가 불가합니다."
    alert(alertText)
  }
}

const confirmDeleteStation = function() {
  const sectionDeleteButton = document.getElementsByClassName("section-delete-button");
  let i;
  for (i = 0; i < sectionDeleteButton.length; i++) {
    const stationName = sectionDeleteButton[i].dataset.name;
    const lineName = sectionDeleteButton[i].dataset.lineName;
    sectionDeleteButton[i].addEventListener("click", () => {
      const returnValue = confirm("정말로 삭제하시겠습니까?");
      if (returnValue) {
        deleteStation(stationName, lineName);
      }
    })
  }
}

const storeLocalStorage = function(lineName, lineStations) {
  let localStorageLine = JSON.parse(localStorage.getItem("line"))
  let i;
  for (i = 0; i < localStorageLine.length; i++) {
    if (localStorageLine[i].name === lineName) {
      localStorageLine[i].line = lineStations
      localStorage.setItem("line", JSON.stringify(localStorageLine))
      printLineList(lineName);
    }
  }

}

const addNewStation = function(lineName, orderInputValue, selectInputValue) {
  let lineStations = getLineStations(lineName);
  lineStations.splice(orderInputValue, 0, selectInputValue)
  storeLocalStorage(lineName, lineStations)
}

const getAllInput = function(lineName, orderInputValue, selectInputValue) {
  const sectionAddButton = document.querySelector("#section-add-button")
  sectionAddButton.addEventListener("click", () => {
    addNewStation(lineName, orderInputValue, selectInputValue)
  }, {once: true})
}

const getLineLength = function(lineName) {
  let objects = JSON.parse(localStorage.getItem("line"));
  let i;
  for (i = 0; i < objects.length; i++) {
    if (objects[i].name === lineName) {
      return objects[i].line.length
    }
  }    
}

const getOrderInput = function(lineName, selectInputValue) {
  const orderInput = document.querySelector("#section-order-input")
  orderInput.addEventListener("change", () => {
    const orderInputValue = orderInput.value;
    const lineLength = getLineLength(lineName);
    const alertText = "가능한 순서를 입력해 주세요."
    if (isValidNumber(orderInputValue, lineLength)) {
      getAllInput(lineName, orderInputValue, selectInputValue)
    } else {
      alert(alertText)
    }
  }, {once: true});
}

const getSelectInput = function(lineName) {
  const selectInput = document.querySelector("#section-station-selector");
  const lineStations = getLineStations(lineName)
  selectInput.addEventListener("mouseleave", () => {
    const selectInputValue = selectInput.value;
    const alertText = "노선에 등록되지 않은 역을 선택해 주세요."
    if (!isInLine(selectInputValue, lineStations)) {
      getOrderInput(lineName, selectInputValue)
    } else {
      alert(alertText);
    }
  })
}

const addShowEvent = function() {
  const sectionLineMenuButton = document.getElementsByClassName("section-line-menu-button");
  let i;
  for (i = 0; i < sectionLineMenuButton.length; i++) {
    const lineName = sectionLineMenuButton[i].dataset.buttonId;
    sectionLineMenuButton[i].addEventListener("click", () => {
      showContents(lineName);
      printLineList(lineName);
      getSelectInput(lineName);
    })
  }
}

const init = function() {
 const section = document.querySelector("#section");
 const table = document.querySelector("#section-list");
 section.style.display = "none";
 table.style.display = "none";
 if (localStorage.getItem("station")) {
   addOption();
 }
 if (localStorage.getItem("line")) {
   addSelectButton();
 }
}
init();

export { getLineStations, confirmDeleteStation, addShowEvent }