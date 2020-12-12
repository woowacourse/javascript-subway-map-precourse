import Component from "./Component.js";

export default class StationManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.$component.innerHTML = "StationManager";

  }

}