import {
	MINIMUM_LINE_LENGTH_ALERT_MESSAGE, 
	MINIMUM_LINE_LENGTH,
} from '../constants.js';

const alertMinimumLineLength = () => {
	alert(MINIMUM_LINE_LENGTH_ALERT_MESSAGE);

	return true;
};

const minimumLineLength = (lines) => {
	if (lines.length === MINIMUM_LINE_LENGTH) {
		return alertMinimumLineLength();
	}
};

export const isMinimumLineLength = (lines) => {
	return minimumLineLength();
};