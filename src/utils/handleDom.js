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
  addCell(tr, addDeleteButton(name, "삭제"));
  table.appendChild(tr);
};

const addCell = (tr, value) => {
  const td = document.createElement("td");

  td.innerHTML = value;
  tr.appendChild(td);
};

const addDeleteButton = (name, buttonName) => {
  return `<button class="delete-button" data-station="${name}">${buttonName}</button>`;
};

export const getStationsTableHeader = () => {
  return `<th>역 이름</th>
          <th>설정</th>`;
};
