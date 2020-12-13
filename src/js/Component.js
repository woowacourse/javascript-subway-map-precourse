import { DOM_ID } from "../utils/constants.js";

export default class Component {
  constructor() {
    console.log("-----Component------");
    this._app = document.getElementById(DOM_ID.ID);
  }
}
