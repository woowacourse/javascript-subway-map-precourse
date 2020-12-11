export const mapContainer = lines => {
  return `<div class="map">
    ${lines.map(line => lineList(line)).join('')}
  </div>`;
};

const lineList = ({ name, stations }) => {
  return `<ol>
    ${lineHeading(name)}
    ${stations.map(station => stationLi(station.name)).join('')}
  </ol>`;
};

const lineHeading = name => {
  return `<h4>${name}</h4>`;
};

const stationLi = name => {
  return `<li>${name}</li>`;
};
