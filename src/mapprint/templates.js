const MAP_CONTAINER = `
<div class="map">
</div>
`;

const getLineName = (_line) => {
  return `<h3>${_line.name}</h3>`;
};

const getInLineStations = (_line) => {
  let inLineStations = "";

  for (let i = 0; i < _line.lineLength(); i++) {
    inLineStations += `<li>${_line.inLineStations[i]}</li>`;
  }

  return inLineStations;
};

const createMap = (_lines) => {
  const mapContainer = document.getElementsByClassName("map");

  for (let i = 0; i < mapContainer.length; i++) {
    const line = _lines[i];

    mapContainer[i].innerHTML = `
    ${getLineName(line)}<ul>${getInLineStations(line)}</ul>
    `;
  }
};

const printLayout = (_lines) => {
  const managerContainer = document.getElementById("manager-container");

  managerContainer.innerHTML = "";

  for (let i = 0; i < _lines.length; i++) {
    managerContainer.innerHTML += MAP_CONTAINER;
  }
};

export { printLayout, createMap };
