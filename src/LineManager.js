import Component from "./Component.js";

export default class LineManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.$component.innerHTML = "LineManager";
  }

}