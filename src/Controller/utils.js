export const appendChilds = (parent, childs) => {
	childs.forEach((child) => {
		parent.appendChild(child);
	});
};

export const clearAllContents = (parents) => {
	parents.textContent = '';
};
