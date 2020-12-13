import LineManagerEvent from "./LineManagerEvent.js";

export default class LineManager extends LineManagerEvent {
  constructor() {
    super();
    console.log("--LineManager--");
  }
}
