import Line from "../models/Line.js";

export default {
  init(element) {
    this.el = element;
    this.render();
  },

  query(selector) {
    return this.el.querySelector(selector);
  },

  render() {
    const html = Line.list().reduce((html, line) => {
      const stations = line.stations;
      const name = line.name;

      return html + stations.reduce((html, station) => html + `
        <li>${station}</li>
      `, `<h3>${name}</h3><ul>`) + '</ul>';
    }, '');

    this.query('.map').innerHTML = html;
  },
}
