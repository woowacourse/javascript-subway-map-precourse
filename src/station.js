class Station {
  constructor() {
    this.stations = [];
    this.handleAddNameClick();
  }

  checkVaildName = name => {
    // 주어진 역이름이 2글자이상이고 중복 아니면 true
    return name.length >= 2 && !this.stations.includes(name);
  };

  getNameInput = e => {
    const station = document.getElementById("station-name-input").value;
    document.getElementById("station-name-input").value = "";

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
