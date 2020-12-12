import Component from "./Component.js";

export default class MapPrintManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.$component.innerHTML = "MapPrintManager";
  }

}