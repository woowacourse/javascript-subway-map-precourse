import {DELETE_CONFIRMATION_MESSAGE} from '../constants.js';

const unconfirmedDelete = () => {
	return confirm(DELETE_CONFIRMATION_MESSAGE);
};

export const isUnconfirmedDelete = () => {
	return unconfirmedDelete();
};