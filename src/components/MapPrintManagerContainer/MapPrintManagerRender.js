import Component from "../../js/Component.js";

export default class MapPrintManagerRender extends Component {
  constructor(stateId) {
    super(stateId);
    this.initDOM();
    this.render();
  }

  initDOM() {
    this.mapElement = document.createElement("div");
    this.mapElement.setAttribute("class", "map");
  }

  render() {
    this._app.appendChild(this.mapElement);
    this.mapRender();
  }

  mapRender() {
    this.lines.forEach((lineInfo) => {
      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      const ul = document.createElement("ul");

      h2.innerText = lineInfo.lineName;
      ul.innerHTML = this.listRender(lineInfo.line);
      div.append(h2, ul);
      this.mapElement.appendChild(div);
    });
  }

  listRender(lines) {
    let ulInnerHTML = ``;

    lines.forEach((line) => {
      ulInnerHTML += `
        <li>${line}</li>
      `;
    });

    return ulInnerHTML;
  }
}
