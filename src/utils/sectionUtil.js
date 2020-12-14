export const getStationsInLine = (selectedLine) => {
  const lines = JSON.parse(localStorage.getItem("lines")) || [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].lineName === selectedLine) return lines[i].stationsInLine;
  }
};
