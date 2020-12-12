class Table {
  createTable = ths => {
    const table = document.createElement("table");
    table.border = 2;
    for (let i = 0; i < ths.length; i++) {
      const th = document.createElement("th");
      th.innerHTML = ths[i];
      table.appendChild(th);
    }

    return table;
  };

  createTr = tds => {
    const tr = document.createElement("tr");
    for (let i = 0; i < tds.length; i++) {
      tr.appendChild(tds[i]);
    }

    return tr;
  };

  createValueTd = value => {
    const stationTd = document.createElement("td");
    stationTd.innerHTML = value;

    return stationTd;
  };

  createButtonTd = (btnName, className) => {
    const button = document.createElement("button");
    const td = document.createElement("td");
    button.innerHTML = btnName;
    button.className = className;
    td.appendChild(button);

    return td;
  };

  createSelect = (selectContainer, values) => {
    values.forEach(value => {
      const option = document.createElement("option");
      option.innerHTML = value;
      selectContainer.appendChild(option);
    });
  };
}

export const {
  createTable,
  createTr,
  createValueTd,
  createButtonTd,
  createSelect,
} = new Table();
