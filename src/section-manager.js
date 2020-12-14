import { isInLine, isValidNumber } from './check.js'

export default function SectionManager() {
  this.getAllInput = function(lineName, orderInputValue, selectInputValue) {
    const sectionAddButton = document.querySelector("#section-add-button")
    sectionAddButton.addEventListener("click", () => {
      console.log(lineName, orderInputValue, selectInputValue)
    })
  }

  this.getLineLength = function(lineName) {
    let objects = JSON.parse(localStorage.getItem("line"));
    let i;
    for (i = 0; i < objects.length; i++) {
      if (objects[i].name === lineName) {
        return objects[i].line.length
      }
    }    
  }

  this.getLineStations = function(lineName) {
    let objects = JSON.parse(localStorage.getItem("line"));
    let i;
    for (i = 0; i < objects.length; i++) {
      if (objects[i].name === lineName) {
        return objects[i].line
      }
    }
  }

  this.getOrderInput = function(lineName, selectInputValue) {
    const orderInput = document.querySelector("#section-order-input")
    orderInput.addEventListener("change", () => {
      const orderInputValue = orderInput.value;
      const lineLength = this.getLineLength(lineName);
      const alertText = "가능한 순서를 입력해 주세요."
      if (isValidNumber(orderInputValue, lineLength)) {
        this.getAllInput(lineName, orderInputValue, selectInputValue)
      } else {
        alert(alertText)
      }
    })
  }

  this.getSelectInput = function(lineName) {
    const selectInput = document.querySelector("#section-station-selector");
    const lineStations = this.getLineStations(lineName)
    selectInput.addEventListener("mouseleave", () => {
      const selectInputValue = selectInput.value;
      const alertText = "노선에 등록되지 않은 역을 선택해 주세요."
      if (!isInLine(selectInputValue, lineStations)) {
        this.getOrderInput(lineName, selectInputValue)
      } else {
        alert(alertText);
      }
    })
  }

  this.showContents = function(lineName) {
    const section = document.querySelector("#section")
    const lineText = document.querySelector("#line-text")
    const table = document.querySelector("#section-list")
    const lineStations = this.getLineStations(lineName);
    section.style.display = "block"
    lineText.innerText = `${lineName} 관리`
    table.innerHTML = `<tr><th scope="row">순서</th><th scope="row">이름</th><th scope="row">설정</th></tr>`;
    table.style.display = "table"
    let i;
    for (i = 0; i < lineStations.length; i++) {
      const index = lineStations.indexOf(lineStations[i])
      table.innerHTML += `<tr id="${lineStations[i]}"><td id="index">${index}</td><td>${lineStations[i]}</td><td><button>노선에서 제거</button></td></tr>`
    }
  }

  this.addShowEvent = function() {
    const sectionLineMenuButton = document.getElementsByClassName("section-line-menu-button");
    let i;
    for (i = 0; i < sectionLineMenuButton.length; i++) {
      const lineName = sectionLineMenuButton[i].dataset.buttonId;
      sectionLineMenuButton[i].addEventListener("click", () => {
        this.showContents(lineName);
        this.getSelectInput(lineName);
      })
    }
  }

  this.addSelectButton = function() {
    const lines = JSON.parse(localStorage.getItem("line"))
    let i;
    for (i = 0; i < lines.length; i++) {
      const key = lines[i].name
      const select = document.querySelector("#select")
      select.innerHTML += `<button type="button" id="select-button" data-button-id="${key}" class="section-line-menu-button">${key}</button>`
      this.addShowEvent();
    }
  }

  this.addOption = function() {
    const key = "station";
    const stations = JSON.parse(localStorage.getItem(key));
    const sectionStationSelector = document.querySelector("#section-station-selector")
    let i;

    for (i = 0; i < stations.length; i++) {
      sectionStationSelector.innerHTML += `<option>${stations[i].name}</option>`;
    }
  }

  this.init = function() {
   const section = document.querySelector("#section");
   const table = document.querySelector("#section-list");
   section.style.display = "none";
   table.style.display = "none";
   if (localStorage.getItem("station")) {
     this.addOption();
   }
   this.addSelectButton();
  }
  this.init();
}

new SectionManager();