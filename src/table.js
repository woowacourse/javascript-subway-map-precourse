class Table {
  createCustomElement = ({
    tag,
    innerHTML,
    id,
    className,
    style,
    toAppend,
  }) => {
    const element = document.createElement(tag);
    if (innerHTML) element.innerHTML = innerHTML;
    if (className) element.className = className;
    if (id) element.id = id;
    if (style) element.style.cssText = style;
    if (toAppend) element.appendChild(toAppend);

    return element;
  };

  createTable = ths => {
    const table = this.createCustomElement({ tag: "table" });
    table.border = 2;
    for (let i = 0; i < ths.length; i++) {
      const th = this.createCustomElement({
        tag: "th",
        innerHTML: ths[i],
      });
      table.appendChild(th);
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

  createValueTd = value => {
    return this.createCustomElement({ tag: "td", innerHTML: value });
  };

  createButtonTd = (innerHTML, className) => {
    const button = this.createCustomElement({
      tag: "button",
      innerHTML,
      className,
    });
    const td = this.createCustomElement({ tag: "td", toAppend: button });

    return td;
  };

  createSelect = (selectContainer, values) => {
    if (values) {
      for (let i = 0; i < values.length; i++) {
        selectContainer.appendChild(
          this.createCustomElement({ tag: "option", innerHTML: values[i] })
        );
      }
    }
  };
}

export const {
  createCustomElement,
  createTable,
  createTr,
  createValueTd,
  createButtonTd,
  createSelect,
} = new Table();
