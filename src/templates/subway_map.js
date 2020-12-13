export const mapContainer = lines => {
  return `<div class="map">
    ${lines.map(line => lineHeading(line.name) + lineList(line)).join('')}
  </div>`;
};

const lineList = ({ stations }) => {
  return `<ul>
    ${stations.map(station => stationLi(station.name)).join('')}
  </ul>`;
};

const lineHeading = name => {
  return `<h4>${name}</h4>`;
};

const stationLi = name => {
  return `<li>${name}</li>`;
};
