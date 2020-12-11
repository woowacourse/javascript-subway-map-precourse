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
}

export const { createTable } = new Table();
