const initState = {
  stations: [],
  lines: [],
};

export default () => {
  console.log(localStorage);

  initState.stations = JSON.parse(localStorage.getItem("stations"));
  initState.lines = JSON.parse(localStorage.getItem("lines"));

  console.log(initState);
};
