export const printStations = () => {
  const stations = JSON.parse(localStorage.getItem('stations'));
  const tableBody = document.querySelector('#station-list');
  let tableRows = '';
  if (stations.length === 0) {
    clearTable();
    return;
  }

  for (let i = 0; i < stations.length; i++) {
    tableRows += `<tr><td>${stations[i]}</td><td><input data-station="${stations[i]}" type="button" value="삭제"></td></tr>`;
    tableBody.innerHTML = tableRows;
  }
};

const clearTable = () => {
  const tableBody = document.querySelector('#station-list');
  tableBody.innerHTML = '';
};
