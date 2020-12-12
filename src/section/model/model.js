export default class SectionModel {
	getSectionStorageData = () => {
		const sectionData = JSON.parse(localStorage.getItem('section-data'));
		
		if (sectionData === null) {
			return [];
		}

		return sectionData;
	}

	setSectionStorageData = (section) => {
		localStorage.setItem('section-data', JSON.stringify(section));
	}
}