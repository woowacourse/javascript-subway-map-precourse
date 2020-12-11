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
}

export const { createTable, createTr, createValueTd } = new Table();
