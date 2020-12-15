import stationStorage from '../../storage/stationStorage.js';
import lineStorage from '../../storage/lineStorage.js';

const STATION_LIST_TEMPLATE = (stationId) => {
  const station = stationStorage().getStationById(stationId);
  return `<li data-stationId=${station.id}>${station.name}</li>`;
};

const MAP_MANAGER_PAGE_TEMPLATE = () => {
  const lines = lineStorage().getLines();
  return `<div class="map">
  ${lines
    .map(
      (line) =>
        `<article><h3>${line.name}</h3>
           <ui data-lineId=${line.id}>${line.stationIds
          .map(STATION_LIST_TEMPLATE)
          .join('')}</ui></article>`
    )
    .join('')}
  </div>`;
};

export default MAP_MANAGER_PAGE_TEMPLATE;
