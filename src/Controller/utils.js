export const appendChilds = (parent, childs) => {
	childs.forEach((child) => {
		parent.appendChild(child);
	});
};
