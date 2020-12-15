const getSubwayLineTemplate = (lineName, stationNamesInLine) => {
  let stationItemsTemplate = '';
  stationNamesInLine.forEach((stationName) => {
    stationItemsTemplate += `<li>${stationName}</li>`;
  });

  return `
    <h2>${lineName}</h2>
    <ul>
      ${stationItemsTemplate}
    </ul>
  `;
};

export const getSubwayMapTemplate = (allLines) => {
  const allLineNames = Object.keys(allLines);
  let subwayMapTemplate = '';
  allLineNames.forEach((lineName) => {
    const { allStationsInLine } = allLines[lineName];
    subwayMapTemplate += getSubwayLineTemplate(lineName, allStationsInLine);
  });

  return `
    <div class="map">
      ${subwayMapTemplate}
    </div>
  `;
};

export default {
  getSubwayMapTemplate,
};
