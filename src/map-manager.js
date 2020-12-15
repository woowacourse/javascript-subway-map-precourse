export default function Map() {
  this.printMapData = function(lineName, lineArray, parsedLineLength) {
    let map = document.querySelector(".map")
    map.innerHTML += `<h3>${lineName}</h3><ul><li>${lineArray[0]}</li><li>${lineArray[parsedLineLength - 1]}</li></ul>`
  }

  this.getMapData = function() {
    const key = "line";
    const parsedMapData = JSON.parse(localStorage.getItem(key));
    let i;
    
    for (i = 0; i < parsedMapData.length; i++) {
      const lineName = parsedMapData[i].name
      const lineArray = parsedMapData[i].line
      const parsedLineLength = parsedMapData[i].line.length
      this.printMapData(lineName, lineArray, parsedLineLength)
    }
  }

  this.init = function() {
    this.getMapData();
  }

  this.init();
}

new Map();