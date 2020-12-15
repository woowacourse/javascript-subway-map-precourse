import { classname, SUBWAY_MAP_LOCAL_STORAGE_KEY } from "./constant.js";

// eslint-disable-next-line no-unused-vars
export const createHTMLElement = ({ tagname, classList = [], dataset = {}, innerText = "", htmlFor, name, ...rest }) => {
  const $element = document.createElement(tagname);
  $element.innerText = innerText;
  
  classList.forEach(className => $element.classList.add(className));

  Object.entries(rest).forEach(([key, value]) => $element.setAttribute(key, value));
  
  Object.entries(dataset).forEach(([key, value]) => $element.dataset[key] = value);

  return $element;
};

export const createButtonHTMLElement = ({ onClick, name, ...rest }) => {
  const $button = createHTMLElement({ tagname: "button", innerText: name, ...rest });
    
  $button.addEventListener("click", onClick);

  return $button;
};

export const createInputHTMLElement = ({ onKeydown, ...rest }) => {
  const $input = createHTMLElement({ tagname: "input", ...rest });
    
  $input.addEventListener("keydown", onKeydown);

  return $input;
};

export const createInputTextHTMLElement = ({ id, onKeydown, placeholder, ...rest }) => {
  return createInputHTMLElement({ id, onKeydown, placeholder, type: "text", ...rest });
};

export const createInputNumberHTMLElement = ({onKeydown, ...rest }) => {
  return createInputHTMLElement({ type: "number", onKeydown, rest });
};

export const createLabelHTMLElement = ({ name, htmlFor, classList}) => {
  const $label = createHTMLElement({ tagname: "label", innerText: name, classList });

  if (htmlFor) {
    $label.setAttribute("for", htmlFor);
  }
  
  return $label;
};

export const createDivHTMLElement = ({ ...rest}) => {
  const $div = createHTMLElement({ tagname: "div", ...rest });
  
  return $div;
};

const createOptionHTMLElement = value => {
  const $option =createHTMLElement({ tagname: "option", innerText: value, value });

  return $option;
};

export const createSelectHTMLElement = ({ options = [], ...rest }) => {
  const $select = createHTMLElement({ tagname: "select", ...rest });

  const $options = options.map(optionValue => createOptionHTMLElement(optionValue));
  $select.append(...$options);

  return $select;
};

export const createListHeaderHTMLElement = ({ innerText, className }) => {
  return createDivHTMLElement({
    innerText,
    classList: [className, classname.CENTER, classname.STRONG, classname.HEADER]
  });
};

export const clearInputValue = $input => {
  $input.value = "";
  $input.focus();
};

const retrieveInfoFromLocalStorage = KEY => JSON.parse(localStorage.getItem(KEY));

export const retrieveState = () => retrieveInfoFromLocalStorage(SUBWAY_MAP_LOCAL_STORAGE_KEY);

const storeInfoToLocalStorage = (LOCAL_STORAGE_KEY, info) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(info));

export const storeState = state => storeInfoToLocalStorage(SUBWAY_MAP_LOCAL_STORAGE_KEY, state);

export const throwErrorWithMessage = errorMessage => {
  throw Error(errorMessage);
};

export const cmpLineName = ({ lineName: aLineName }, { lineName: bLineName }) => {
  return aLineName < bLineName ? -1 : 1;
};