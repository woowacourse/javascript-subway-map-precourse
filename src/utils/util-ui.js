export const requestInputAgain = (element) => {
  emptyElement(element);
  element.focus();
};

export const setID = (element, id) => {
  if (id) {
    id = id[0] === '#' ? id.slice(1) : id;
    element.id = id;
  }
};

export const setClassName = (element, className) => {
  if (className) {
    className = className[0] === '.' ? className.slice(1) : className;
    element.className = className;
  }
};

export const appendNew = (tagName, parentElement, content, id, className) => {
  const newElement = document.createElement(tagName);

  if (parentElement) parentElement.append(newElement);
  if (content) newElement.innerHTML = content;
  setID(newElement, id);
  setClassName(newElement, className);
  return newElement;
};

export const makeButton = (className, datasetKey, datasetValue, content) => {
  const button = document.createElement('button');

  setClassName(button, className);
  if (datasetKey && datasetValue) button.setAttribute(datasetKey, datasetValue);
  if (content) button.innerHTML = content;
  return button;
};

export const makeLabel = (group, content) => {
  const label = document.createElement('label');

  if (group) label.for = group;
  if (content) label.innerHTML = content;
  return label;
};

export const appendSelector = (itemList, form, id, labelContent) => {
  const options = itemList.map((item) => makeOption(item.name));
  const selector = makeSelector(id, options);

  appendNew('label', form, labelContent);
  form.append(selector);
};

export const makeSelector = (id, options) => {
  const select = document.createElement('select');

  setID(select, id);
  if (options) options.forEach((option) => select.append(option));
  return select;
};

export const makeOption = (value) => {
  const option = document.createElement('option');

  option.setAttribute('value', value);
  option.innerHTML = value;
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

export const addEventListenerOnAddButton = (menu, handler, key) => {
  document
    .getElementById(`${menu}-add-button`)
    .addEventListener('click', () => {
      handler(menu, key);
    });
};

export const addEventListenerOnDeleteButton = (button, menu, handler) => {
  button.addEventListener('click', (e) => {
    handler(e, menu);
  });
};

export const getNthParent = (element, n) => {
  while (n && element) {
    element = element.parentNode;
    n--;
  }
  return element;
};
