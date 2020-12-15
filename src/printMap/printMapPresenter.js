export const listHeaderPresenter = lineData => {
  const printMapContainer = document.querySelector(
    "#map-print-manager-container",
  );
  let listTemplate = "";
  for (const line of lineData) {
    listTemplate += `
      <h3>${line[0]}</h3>
    `;
    listTemplate += listStation(line);
  }
  printMapContainer.innerHTML = listTemplate;
};

const listStation = lineData => {
  let stationTemplate = `<ul>`;
  for (let i = 1; i < lineData.length; i++) {
    stationTemplate += `
      <li>${lineData[i]}</li>
    `;
  }
  stationTemplate += `</ul>`;
  return stationTemplate;
};
