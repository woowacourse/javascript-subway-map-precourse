class Table {
  createCustomElement = ({ tag, innerHTML, id, className, toAppend }) => {
    const element = document.createElement(tag);
    if (innerHTML) element.innerHTML = innerHTML;
    if (className) element.className = className;
    if (id) element.id = id;
    if (toAppend) element.appendChild(toAppend);

    return element;
  };

  createTable = ths => {
    const table = this.createCustomElement({ tag: "table" });
    for (let i = 0; i < ths.length; i++) {
      table.appendChild(
        this.createCustomElement({
          tag: "th",
          innerHTML: ths[i],
        })
      );
    }

    return table;
  };

  createTr = tds => {
    const tr = this.createCustomElement({ tag: "tr" });
    for (let i = 0; i < tds.length; i++) {
      tr.appendChild(tds[i]);
    }

    return tr;
  };

  createButton = (innerHTML, className) => {
    return this.createCustomElement({
      tag: "button",
      innerHTML,
      className,
    });
  };
}

export const {
  createCustomElement,
  createTable,
  createTr,
  createButton,
} = new Table();
