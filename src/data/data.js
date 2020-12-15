import { setItemWithKey, getItemByKey } from '../utils/localStorage.js';
import { stationNameInputElement } from '../elements/stationManager.js';
import {
  lineEndStationSelectorElement,
  lineStartStationSelectorElement,
  lineNameInputElement,
} from '../elements/lineManager.js';
import {
  sectionOrderInputElement,
  sectionStationSelectorElement,
  sectionLineNameElement,
} from '../elements/sectionManager.js';

export const data = {
  stationNameInputValue: '',
  lineNameInputValue: '',
  lineStartStationSelectorValue: '',
  lineEndStationSelectorValue: '',
  sectionLineNameValue: '',
  sectionStationSelectorValue: '',
  sectionOrderInputNumberValue: '',
};

export const saveDataToLocalStorage = () => {
  setItemWithKey(data, 'data');
};

export default {};
