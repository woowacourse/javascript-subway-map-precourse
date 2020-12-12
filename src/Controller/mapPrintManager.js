import Line from '../Model/Line.js';
import { alertAndClear } from './utils.js';
import { errorAlertMessages } from '../key/alertMessages.js';

export const canAccessMapPrintPage = () => {
	if (Line.readAllLines().length < 1) {
		alertAndClear(errorAlertMessages.ALERT_NOT_ENOUGH_LINE);
		return false;
	}
	return true;
};
