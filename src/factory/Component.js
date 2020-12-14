export default class Component {
  constructor(props = {}) {
    this.data = {};
    this.props = props;
    this.managerId = props.managerId;
    this.container = document.querySelector(`#${props.containerId}`);
  }

  setData(nextData) {
    this.data = {
      ...this.data,
      ...nextData,
    };
    this.render();
  }

  show() {
    this.container.style.display = 'block';
  }

  hide() {
    this.container.style.display = 'none';
  }

  render() {}
}
