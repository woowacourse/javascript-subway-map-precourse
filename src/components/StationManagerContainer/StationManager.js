import StationManagerEvent from "./StationManagerEvent.js";

export default class StationManager extends StationManagerEvent {
  constructor() {
    super();
    console.log("--StationManager--");
  }
}
