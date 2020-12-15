export const isInLine = (stationName) => {
  const lines = JSON.parse(localStorage.getItem("lines")) || [];
  let flag = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].stationsInLine.includes(stationName)) {
      flag = true;
      break;
    }
  }

  return flag;
};
