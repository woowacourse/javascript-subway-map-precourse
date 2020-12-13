import LineManagerRender from "./LineManagerRender.js";

export default class LineManagerEvent extends LineManagerRender {
  constructor(stateId) {
    super(stateId);
    console.log("--LineManagerEvent--");
  }
}
