import MapPrintManagerEvent from "./MapPrintManagerEvent.js";

export default class MapPrintManager extends MapPrintManagerEvent {
  constructor(stateId) {
    super(stateId);
    console.log("--MapPrintManager--");
  }
}
