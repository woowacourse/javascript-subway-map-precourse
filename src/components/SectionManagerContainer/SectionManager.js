import SectionManagerEvent from "./SectionManagerEvent.js";

export default class SectionManager extends SectionManagerEvent {
  constructor(stateId) {
    super(stateId);
    console.log("--SectionManager--");
  }
}
