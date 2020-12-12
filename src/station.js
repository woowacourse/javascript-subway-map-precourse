export default function Station() {
  this.getStationName = function() {
    const stationAddButton = document.querySelector("#station-add-button");
    stationAddButton.addEventListener("click", () => {
      const stationName = document.querySelector("#station-name-input").value;
      console.log(stationName);
    })
  }

  this.getStationName();
}
  
new Station();