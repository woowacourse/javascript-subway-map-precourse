export const displayShow = (dom) => {
  dom.style.display = "block";
};

export const displayhide = (dom) => {
  dom.style.display = "none";
};

export const hideOrShow = (selectedDom, doms) => {
  doms.forEach((dom) => {
    dom === selectedDom ? displayShow(dom) : displayhide(dom);
  });
};

export const showErrors = (error) => {
  alert(error);
};

export const addRow = (table, name, index) => {
  const tr = document.createElement("tr");

  addCell(tr, name);
  addCell(tr, addDeleteButton(index, "삭제"));
  table.appendChild(tr);
};

const addCell = (tr, value) => {
  const td = document.createElement("td");

  td.innerHTML = value;
  tr.appendChild(td);
};

const addDeleteButton = (index, buttonName) => {
  return `<button value=${index}>${buttonName}</button>`;
};
