import { alertAndClear, isOnlySpaceString } from '../Controller/utils.js';
import words from '../key/words.js';
import { errorAlertMessages } from '../key/alertMessages.js';

const Line = function (lineName) {
	this.name = lineName;
	this.stations = [];
};

Line.isDupliateLineName = (lineName) =>
	Line.readAllLines()
		.map((line) => line.name)
		.includes(lineName);

Line.isValidLineName = (lineName, inputElement) => {
	if (isOnlySpaceString(lineName)) {
		alertAndClear(errorAlertMessages.ALERT_SPACE_LINE_NAME, inputElement);
		return false;
	}
	if (isDupliateLineName) {
		alertAndClear(errorAlertMessages.ALERT_EXISTED_LINE_NAME, inputElement);
		return false;
	}
	return true;
};

Line.saveAllLines = (lines) => {
	localStorage.setItem(words.LINE, JSON.stringify(lines)); // 정렬기능 추가하기
};

Line.readAllLines = () => {
	return JSON.parse(localStorage.getItem(words.LINE));
};

Line.removeAllLines = () => {
	localStorage.removeItem(words.LINE);
};

Line.addOneLine = (line) => {
	const allLines = Line.readAllLines();
	allLines.push(line);
	Line.saveAllLines(allLines);
};

Line.removeOneLine = (targetLine) => {
	const allLines = Line.readAllLines();
	const targetIndex = allLines.findIndex((line) => {
		return targetLine === line.name;
	});
	if (targetIndex !== -1) {
		allLines.splice(targetIndex, 1);
		Line.saveAllLines(allLines);
	}
};

Line.hasThisStation = (lineName, stationName) => {
	const allLines = Line.readAllLines();
	const targetLineIndex = Line.searchLinesByName(lineName);
	return allLines[targetLineIndex].stations.indexOf(stationName) !== -1;
};

Line.searchLinesByName = (lineName) => {
	const targetIndex = Line.readAllLines()
		.map((line) => line.name)
		.indexOf(lineName);
	return targetIndex;
};

Line.getStationLength = (lineName) => {
	const allLines = Line.readAllLines();
	const targetIndex = Line.searchLinesByName(lineName);
	return allLines[targetIndex].stations.length;
};

Line.removeStationOnLine = (lineName, stationName) => {
	const allLines = Line.readAllLines();
	const targetIndex = Line.searchLinesByName(lineName);
	allLines[targetIndex].stations = allLines[targetIndex].stations.filter(
		(station) => station !== stationName
	);
	Line.saveAllLines(allLines);
};

export default Line;
