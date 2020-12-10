class Station {
  constructor() {
    this.stations = [];
    this.handleAddNameClick();
  }

  handleAddNameClick = () => {
    const stationAddBtn = document.getElementById("station-add-button");
    stationAddBtn.addEventListener("click", this.addStation);
  };
}

export default Station;
