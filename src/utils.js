const app = document.getElementById('app');

export const clearPage = () => {
  const contents = app.childNodes;
  let i = contents.length;
  while (i-- > 4) {
    app.removeChild(contents[i]);
  }
};

export const createTextInput = (labelName, inputId, placeHolder) => {
  const inputArea = document.createElement('p');
  inputArea.setAttribute('id', 'input-container');
  const inputLabel = document.createElement('b');
  inputLabel.innerHTML = labelName;

  const inputText = document.createElement('input');
  inputText.setAttribute('id', inputId);
  inputText.setAttribute('placeholder', placeHolder);

  inputArea.appendChild(inputLabel);
  inputArea.appendChild(document.createElement('br'));
  inputArea.appendChild(inputText);

  app.appendChild(inputArea);
};

export const createSubmitBtn = (btnId, btnText) => {
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('id', btnId);
  submitBtn.innerHTML = btnText;

  return submitBtn;
};

export const createSelectbox = (select, selectorId, options) => {
  select.setAttribute('id', selectorId);
  options.map(val => {
    const option = document.createElement('option');
    option.value = val;
    option.text = val;
    select.options.add(option);
  });
};

export const createTable = (tableId, tableHeaders) => {
  const table = document.createElement('table');
  table.setAttribute('border', 1);
  table.setAttribute('id', tableId);

  tableHeaders.map(tableHeader => {
    const header = document.createElement('th');
    header.innerHTML = tableHeader;
    table.appendChild(header);
  });

  return table;
};
