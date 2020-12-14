class InnerSectionTable {
  constructor($target, { lineName, stationStore, lineStore }) {
    this.$target = $target;
    this.lineName = lineName;
    this.stationStore = stationStore;
    this.lineStore = lineStore;

    this.lineStore.subscribe(this.render);
    this.render();
    this.bindEvents();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <table border="1" style="margin-top: 15px;">
        <tr>
          <th>노선 이름</th>
          <th>상행 종점역</th>
          <th>하행 종점역</th>
          <th>설정</th>
        </tr>
        ${this.createTableRowsHTML([])}
      </table>`;
  }

  createTableRowsHTML(sections) {
    return sections.reduce((html, station, idx) => {
      html += this.TableRowHTML(idx, station);
      return html;
    }, ``);
  }

  TableRowHTML(idx, station) {
    return `
      <tr>
        <td data-index=${idx}>${idx}<td>
        <td data-name=${station}>${station}<td>
        <td><button class="section-delete-button">노선에서 제거</button><td>
      </tr>
    `;
  }

  mountDOMs() {}

  bindEvents() {}

  render = () => {
    this.mountTemplate();
    this.mountDOMs();
  };
}

export default InnerSectionTable;
