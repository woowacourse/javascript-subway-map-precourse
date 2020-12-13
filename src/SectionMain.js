import Component from "./Component.js";

export default class SectionMain extends Component {
  constructor({ $parent, lineName }) {
    super({ $parent });
    this.$component.innerText = lineName;
  }
}