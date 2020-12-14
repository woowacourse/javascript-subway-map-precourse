export const mapContainer = lines => {
  return `<div class="map">
    ${lines
      .map(({ name, stations }) => {
        return `<div>
          <h2>${name}</h2>
          <ul>
          ${stations
            .map(({ name }) => {
              return `<li>${name}</li>`;
            })
            .join('')}
          </ul>
        </div>`;
      })
      .join('')}
  </div>`;
};
