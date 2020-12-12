function addLine() {
  const inputLineName = document.querySelector('#line-name-input').value;
  const startStation = document.querySelector('#line-start-station-selector')
    .value;
  const endStation = document.querySelector('#line-end-station-selector').value;
  const lines = JSON.parse(localStorage.getItem('lines'));

  if (lines === null) {
    return localStorage.setItem(
      'lines',
      JSON.stringify(`${inputLineName} : [${startStation} ${endStation}]`),
    );
  }
  return localStorage.setItem(
    'lines',
    JSON.stringify(
      `${lines}, ${inputLineName} : [${startStation} ${endStation}]`,
    ),
  );
}

export default function addLineEvent() {
  const $lineAddButton = document.querySelector('#line-add-button');

  $lineAddButton.addEventListener('click', addLine);
}
