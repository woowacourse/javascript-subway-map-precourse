export default class Component {
  constructor(props) {
    this.props = props;

    this.$component = document.createElement("div");
    this.props.$parent?.appendChild(this.$component);
  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state
    };

    this.render();
  }

  // eslint-disable-next-line no-empty-function
  render() {

  }
}