const upDateLine = (selectedLine, stationsInLine) => {
  const lines = JSON.parse(localStorage.getItem("lines")) || [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].lineName === selectedLine) {
      lines[i].stationsInLine = stationsInLine;
      lines[i].startStation = stationsInLine[0];
      lines[i].endStation = stationsInLine[stationsInLine.length - 1];
    }
  }
  localStorage.setItem("lines", JSON.stringify(lines));
};

export const getStationsInLine = (selectedLine) => {
  const lines = JSON.parse(localStorage.getItem("lines")) || [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].lineName === selectedLine) return lines[i].stationsInLine;
  }
};

export const addSection = (idxToInsert, stationToInsert, lineName) => {
  const stationsInLine = getStationsInLine(lineName);
  stationsInLine.splice(idxToInsert, 0, stationToInsert);
  upDateLine(lineName, stationsInLine);
};
