import SectionManagerRender from "./SectionManagerRender.js";

export default class SectionManagerEvent extends SectionManagerRender {
  constructor(stateId) {
    super(stateId);
    console.log("--SectionManagerEvent--");
  }
}
