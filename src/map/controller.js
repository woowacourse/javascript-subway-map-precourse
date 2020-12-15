import { printMapData } from './view.js';

const getMapData = function() {
  const key = "line";
  const parsedMapData = JSON.parse(localStorage.getItem(key));
  let i;
  
  for (i = 0; i < parsedMapData.length; i++) {
    const lineName = parsedMapData[i].name;
    const lineArray = parsedMapData[i].line;
    const parsedLineLength = parsedMapData[i].line.length;
    printMapData(lineName, lineArray, parsedLineLength);
  }
}

const init = function() {
  if (localStorage.getItem("line")) {
    getMapData();
  }
}

init();