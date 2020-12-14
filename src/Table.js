export default class Table {
  constructor({ target }) {
    this._target = target;

    const table = document.createElement('table');
    this.table = table;
    target.appendChild(table);

    const thead = document.createElement('thead');
    this.thead = thead;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    this.tbody = tbody;
    table.appendChild(tbody);
  }

  createTableHeader(headers) {
    this.thead.innerHTML = `
      <tr>
        ${headers.map((header, index) => `
          <th data-index="${index}">${header}</th>
        `).join('')}
      </tr>
    `;
  }

  renderTable({ data, callbackRender, onClickDelete, className }) {
    if (data.length === 0) {
      this.tbody.innerHTML = '';
      return;
    }
    this.tbody.innerHTML = data.map(callbackRender).join('');

    if (onClickDelete) {
      const deleteButtons = this.tbody.querySelectorAll(className);
      deleteButtons.forEach((button, index) => {
        button.addEventListener('click', () => onClickDelete(data[index]));
      });
    }
  }
}
