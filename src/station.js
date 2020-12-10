class Station {
  constructor() {
    this.stations = [];
    this.handleAddNameClick();
  }

  getNameInput = () => {
    const station = document.getElementById("station-name-input").value;

    return station;
  };

  addStation = () => {
    const name = this.getNameInput();

    if (this.checkVaildName(name)) {
      this.stations.push(name);
    }
  };

  handleAddNameClick = () => {
    const stationAddBtn = document.getElementById("station-add-button");
    stationAddBtn.addEventListener("click", this.addStation);
  };
}

export default Station;
