function addStationState() {
  const inputStationName = document.querySelector('#station-name-input').value;
  const stations = JSON.parse(localStorage.getItem('stations'));

  if (!stations) {
    return localStorage.setItem('stations', JSON.stringify(inputStationName));
  }
  return localStorage.setItem(
    'stations',
    JSON.stringify(`${stations} ${inputStationName}`),
  );
}

export default function setState(type) {
  if (type === 'addStation') {
    addStationState();
  }
}
