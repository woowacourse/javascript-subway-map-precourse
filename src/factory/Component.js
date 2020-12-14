export default class Component {
  constructor(props) {
    this.state = {};
    this.managerId = props.managerId;
    this.container = document.querySelector(`#${props.containerId}`);
  }

  setState(nextData) {
    this.state = {
      ...this.state,
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
