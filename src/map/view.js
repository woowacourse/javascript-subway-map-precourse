const printMapData = function(lineName, lineArray, parsedLineLength) {
  let map = document.querySelector(".map")
  map.innerHTML += `<h3>${lineName}</h3><ul><li>${lineArray[0]}</li><li>${lineArray[parsedLineLength - 1]}</li></ul>`
}

export { printMapData }