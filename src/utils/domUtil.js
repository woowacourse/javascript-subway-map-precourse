export const clearInnerHTML = $target => {
  $target.innerHTML = "";
};

export const makeElement = (type, props = {}, text = "") => {
  const $element = document.createElement(type);

  Object.keys(props).forEach(prop => {
    $element[prop] = props[prop];
  });

  const textNode = document.createTextNode(text);
  $element.appendChild(textNode);

  return $element;
};
