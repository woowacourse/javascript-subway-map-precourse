export default function SectionManager() {
  this.getLineStations = function(lineName) {
    let objects = JSON.parse(localStorage.getItem("line"));
    let i;
    for (i = 0; i < objects.length; i++) {
      if (objects[i].name === lineName) {
        return objects[i].line
      }
    }
  }

  this.addTable = function(lineName) {
    const table = document.querySelector("#section-list")
    const lineStations = this.getLineStations(lineName);
    let i;
    table.innerHTML = `<tr><th scope="row">순서</th><th scope="row">이름</th><th scope="row">설정</th></tr>`;
    table.style.display = "table"
    for (i = 0; i < lineStations.length; i++) {
      const index = lineStations.indexOf(lineStations[i])
      table.innerHTML += `<tr id="${lineStations[i]}"><td id="index">${index}</td><td>${lineStations[i]}</td><td><button>설정</button></td></tr>`
    }
  }

  this.addShowEvent = function() {
    const sectionLineMenuButton = document.getElementsByClassName("section-line-menu-button");
    let i;
    for (i = 0; i < sectionLineMenuButton.length; i++) {
      const lineName = sectionLineMenuButton[i].dataset.buttonId;
      sectionLineMenuButton[i].addEventListener("click", () => {
        const section = document.querySelector("#section")
        const lineText = document.querySelector("#line-text")
        section.style.display = "block"
        lineText.innerText = `${lineName} 관리`
        this.addTable(lineName);
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