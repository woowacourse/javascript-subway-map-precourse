export const appendAtEnd = (tagName, parentElement, content, id, className) => {
  const newElement = document.createElement(tagName);

  if (parentElement) parentElement.append(newElement);
  if (content) newElement.innerHTML = content;
  if (id) {
    id = id[0] === '#' ? id.slice(1) : id;
    newElement.setAttribute('id', id);
  }
  if (className) {
    className = className[0] === '.' ? className.slice(1) : className;
    newElement.setAttribute('className', className);
  }
  return newElement;
};

export const emptyElement = (elem) => {
  if (elem.tagName === 'DIV') {
    return (elem.innerHTML = '');
  }
  if (elem.tagName === 'INPUT') {
    return (elem.value = '');
  }
};
