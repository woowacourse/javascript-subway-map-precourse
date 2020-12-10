export const appendAtEnd = (tagName, parentElement, content, id, className) => {
  const newElement = document.createElement(tagName);

  if (parentElement) {
    parentElement.append(newElement);
  }
  if (content) {
    newElement.innerHTML = content;
  }
  if (id) {
    newElement.setAttribute('id', id);
  }
  if (className) {
    newElement.setAttribute('class', className);
  }
  return newElement;
};
