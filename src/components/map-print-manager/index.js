import Component from '../../library/core/component.js';

class MapPrintManager extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
      <div class="map">
        ${this.createMapTemplate()}
      </div>
    `;
  }

  createMapTemplate() {
    return this._props.lines.value
      .map(line => this.createLineMapTemplate(line))
      .join('');
  }

  createLineMapTemplate(line) {
    let template = `<h3>${line.lineName}</h3>`;
    template += '<ul>';
    line.sections.forEach(section => (template += `<li>${section}</li>`));
    template += '</ul>';

    return template;
  }
}

export default MapPrintManager;
