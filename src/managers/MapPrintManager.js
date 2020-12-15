import Component from '../factory/Component.js';
import { MAP_SELECTOR } from '../share/selector.js';
import { mapTemplate } from '../share/template.js';

export default class MapPrintManager extends Component {
  constructor(props) {
    super(props);

    this.map = document.createElement('div');
    this.map.setAttribute('class', MAP_SELECTOR.MAP_CLASS);

    this.container.appendChild(this.map);
  }

  updateTemplate() {
    this.map.innerHTML = mapTemplate(this.data.lineList);
  }

  render() {
    this.updateTemplate();
  }
}
