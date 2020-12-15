const getStationItemTemplate = (stationName) => {
  return `
    <tr>
      <td>${stationName}</td>
      <td><button class="station-delete-button" data-delete-target="${stationName}">삭제</button></td>
    </tr>
  `;
};

export const getStationItemsTemplate = (stationNames) => {
  let stationItems = '';
  stationNames.forEach((stationName) => {
    stationItems += getStationItemTemplate(stationName);
  });

  return stationItems;
};

export default {
  getStationItemsTemplate,
};
