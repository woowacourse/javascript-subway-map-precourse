export const makeElement = ({
  tag,
  id,
  elementClass,
  value,
  type,
  innerHTML,
  placeholder,
  styles,
  dataName,
  dataValue,
}) => {
  const element = document.createElement(tag);
  if (id) element.id = id;
  if (elementClass) element.classList.add(elementClass);
  if (value) element.value = value;
  if (type) element.type = type;
  if (innerHTML) element.innerHTML = innerHTML;
  if (placeholder) element.placeholder = placeholder;
  if (styles) element.style.cssText = styles;
  if (dataName && dataValue) element.setAttribute(`data-${dataName}`, dataValue);
  return element;
};

export const appendElements = (elements, parent) => {
  elements.forEach(element => {
    parent.appendChild(element);
  });
};

export const clearFocus = targetInput => {
  targetInput.value = '';
  targetInput.focus();
};
