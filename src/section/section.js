import LineModel from '../line/model/model.js';

export default class Section {
	constructor(sectionName, startStation, endStation) {
		this.sectionName = sectionName;
		this.sectionArray = [startStation, endStation];
	}
}