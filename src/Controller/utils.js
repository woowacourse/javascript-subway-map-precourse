export const clearAllContents = (parents) => {
	parents.textContent = '';
};

export const isOnlySpaceString = (string) => {
	return string.replace(/\s+/g, '').length === 0;
};

export const appendChilds = (parent, childs) => {
	childs.forEach((child) => {
		parent.appendChild(child);
	});
};

export const addClassToElement = (element, classes = []) => {
	classes.forEach((className) => {
		element.classList.add(className);
	});
	return element;
};

export const makeElement = ({
	tag = 'div',
	innerText,
	id,
	classes,
	placeholder,
	type,
	value,
	innerHTML,
}) => {
	let element = document.createElement(tag);
	if (innerText) element.innerText = innerText;
	if (id) element.id = id;
	if (classes) element = addClassToElement(element, classes);
	if (placeholder) element.placeholder = placeholder;
	if (type) element.type = type;
	if (value) element.value = value;
	if (innerHTML) element.innerHTML = innerHTML;
	return element;
};

export const alertAndClear = (message, inputElement) => {
	alert(message);
	if (inputElement) inputElement.value = '';
};

export const confirmAlert = (message) => confirm(message);
