class MapPrintManager {
  constructor($target, { lineStore }) {
    this.$target = $target;
    this.lineStore = lineStore;

    this.render();
  }

  mountTemplate() {
    this.$target.innerHTML = this.createLineListHTML(this.lineStore.lines);
  }

  createLineListHTML(lines) {
    return lines.reduce((html, line) => {
      html += this.ListHTML(line);
      return html;
    }, ``);
  }

  ListHTML(line) {
    return (
      line.sections.reduce((html, station) => {
        html += `<li>${station}</li>`;
        return html;
      }, `<p>${line.name}</p><ul>`) + `</ul>`
    );
  }

  render = () => {
    this.mountTemplate();
  };
}

export default MapPrintManager;
