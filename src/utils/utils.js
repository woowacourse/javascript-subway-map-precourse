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

  inputArea.append(inputLabel, document.createElement('br'), inputText);
  app.append(inputArea);
};

export const createSubmitBtn = (btnId, btnText) => {
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('id', btnId);
  submitBtn.innerHTML = btnText;

  return submitBtn;
};

export const createSelectbox = (selectorId, options) => {
  const select = document.createElement('select');
  select.setAttribute('id', selectorId);

  options.map(val => {
    const option = document.createElement('option');
    option.value = val;
    option.text = val;
    select.options.add(option);
  });

  return select;
};

export const createTable = (tableId, tableHeaders) => {
  const table = document.createElement('table');
  table.setAttribute('border', 1);
  table.setAttribute('id', tableId);

  tableHeaders.map(tableHeader => {
    const header = document.createElement('th');
    header.innerHTML = tableHeader;
    table.append(header);
  });

  return table;
};
