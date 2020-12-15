export const mapContainer = lines => {
  return `<div class="map">
    ${lineLists(lines)}
  </div>`;
};

const lineLists = lines => {
  return lines
    .map(({ name, stations }) => {
      return `<div>
        <h2>${name}</h2>
        ${stationLists(stations)}
      </div>`;
    })
    .join('');
};

const stationLists = stations => {
  return `<ul>
    ${stations
      .map(({ name }) => {
        return `<li>${name}</li>`;
      })
      .join('')}
  </ul>`;
};
