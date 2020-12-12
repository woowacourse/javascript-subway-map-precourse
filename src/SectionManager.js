import Component from "./Component.js";

export default class SectionManager extends Component {
  constructor({ $parent }) {
    super({ $parent });
    this.$component.innerHTML = "SectionManager";
  }

}