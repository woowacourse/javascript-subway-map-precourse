export const appendChilds = (parent, childs) => {
	childs.forEach((child) => {
		parent.appendChild(child);
	});
};

export const clearAllContents = (parents) => {
	parents.textContent = '';
};

export const isOnlySpaceString = (string) => {
    return string.replace(/\s+/g, '').length === 0;
}

export const saveData = (name, value) => {
    localStorage.setItem(name, value);
}

export const readData = (name) => {
    return localStorage.getItem(name);
}

export const removeData = (name) => {
    return localStorage.removeItem(name);
}