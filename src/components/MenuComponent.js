import MenuComponentEvent from "./MenuComponentEvent.js";

export default class MenuComponent extends MenuComponentEvent {
  constructor() {
    super();
    console.log("--MenuComponent--");
  }
}
