export default class LocalStorage {
	saveData = (key, data) => {
		localStorage.setItem(key, JSON.stringify(data));
	}

	loadData = (key) => {
		const data = JSON.parse(localStorage.getItem(key));

		if (data === null) {
			return {};
		}

		return data;
	}
}