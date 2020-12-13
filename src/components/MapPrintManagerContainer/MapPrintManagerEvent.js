import MapPrintManagerRender from "./MapPrintManagerRender.js";

export default class MapPrintManagerEvent extends MapPrintManagerRender {
  constructor(stateId) {
    super(stateId);
    console.log("--MapPrintManagerEvent--");
  }
}
