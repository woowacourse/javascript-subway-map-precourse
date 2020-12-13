export const clearInnerHTML = $target => {
  $target.innerHTML = ``;
};

export const makeElement = (type, props = {}, innerHTML = ``) => {
  const $element = document.createElement(type);

  Object.keys(props).forEach(prop => {
    $element[prop] = props[prop];
  });

  $element.innerHTML = innerHTML;

  return $element;
};

export const alertMessage = ($input, message) => {
  alert(message);
  $input.value = ``;
  $input.focus();
};
