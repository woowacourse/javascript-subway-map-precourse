import words from '../key/words.js';

const Line = function (lineName) {
	this.name = lineName;
	this.stations = [];
	this.hasStation = (targetStation) => {
		return this.stations.indexOf(targetStation.name) !== -1;
	};
	this.addStation = (station, pos = this.stations.length) => {
		this.stations.splice(pos, 0, station);
	};
	this.removeStation = (targetStation) => {
		if (hasStation(targetStation) !== -1) this.stations.splice(targetIndex, 1);
	};
};

Line.isValidLineName = (lineName) => {
	if (
		!isOnlySpaceString(lineName) &&
		// 형식이 숫자+'호선' 인지 검사하기
		!Line.readAllLines().includes(lineName)
	) {
		return true;
	}
	return false;
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
		return targetLine.name === line.name;
	});
	if (targetIndex !== -1) {
		allLines.splice(targetIndex, 1);
		Line.saveAllLines(allLines);
	}
};

export default Line;
