export const requestInputAgain = (element) => {
  emptyElement(element);
  element.focus();
};

export const appendNew = (tagName, parentElement, content, id, className) => {
  const newElement = document.createElement(tagName);

  if (parentElement) parentElement.append(newElement);
  if (content) newElement.innerHTML = content;
  if (id) {
    id = id[0] === '#' ? id.slice(1) : id;
    newElement.id = id;
  }
  if (className) {
    className = className[0] === '.' ? className.slice(1) : className;
    newElement.className = className;
  }
  return newElement;
};

export const createButton = (className, datasetKey, datasetValue) => {
  const button = document.createElement('button');

  button.className = className;
  button.setAttribute(datasetKey, datasetValue);
  return button;
};

export const createLabel = (group, content) => {
  const label = document.createElement('label');

  if (group) label.for = group;
  if (content) label.innerHTML = content;
  return label;
};

export const createSelect = (name, id, options) => {
  const select = document.createElement('select');

  if (name) select.name = name;
  if (id) select.id = id;
  if (options) options.forEach((option) => select.append(option));
  return select;
};

export const createOption = (value, content) => {
  const option = document.createElement('option');

  option.setAttribute('value', value);
  option.innerHTML = content;
  return option;
};

export const emptyElement = (elem) => {
  if (elem.tagName === 'DIV') {
    return (elem.innerHTML = '');
  }
  if (elem.tagName === 'INPUT') {
    return (elem.value = '');
  }
};

export const addEventListenerOnAddButton = (menu, handler) => {
  document
    .getElementById(`${menu}-add-button`)
    .addEventListener('click', () => {
      handler(menu);
    });
};

export const addEventListenerOnDeleteButton = (button, menu, handler) => {
  button.addEventListener('click', (e) => {
    handler(e, menu);
  });
};
