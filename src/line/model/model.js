export default class LineModel {
	getLineStorageData = () => {
		const lineData = JSON.parse(localStorage.getItem('line-data'));

		if (lineData === null) {
			return {};
		}

		return lineData;
	}

	setLineStorageData = (lines) => {
		localStorage.setItem('line-data', JSON.stringify(lines));
	}
}