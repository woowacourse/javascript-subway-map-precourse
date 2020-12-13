export default function checkLocalStorageItem() {
  if (localStorage.stations === undefined) {
    localStorage.stations = JSON.stringify([]);
  }
  if (localStorage.lines === undefined) {
    localStorage.lines = JSON.stringify([]);
  }
}
