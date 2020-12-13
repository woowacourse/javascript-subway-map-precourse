import LineManagerEvent from "./LineManagerEvent.js";

export default class LineManager extends LineManagerEvent {
  constructor(stateId) {
    super(stateId);
    console.log("--LineManager--");
  }
}
