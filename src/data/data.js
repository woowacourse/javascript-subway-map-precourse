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
import { INTERFACE_DATA_ITEM_NAME } from '../constants/configuration.js';

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
  setItemWithKey(data, INTERFACE_DATA_ITEM_NAME);
};

export const loadDataToLocalStorage = () => {
  const loadedData = getItemByKey(INTERFACE_DATA_ITEM_NAME);
  if (loadedData) {
    data.stationNameInputValue = loadedData.stationNameInputValue;
    data.lineNameInputValue = loadedData.lineNameInputValue;
    data.upTerminatingStationNameValue =
      loadedData.upTerminatingStationNameValue;
    data.downTerminatingStationNameValue =
      loadedData.downTerminatingStationNameValue;
    data.sectionLineValue = loadedData.sectionLineValue;
    data.sectionStationSelectorValue = loadedData.sectionStationSelectorValue;
    data.sectionOrderInputNumberValue = loadedData.sectionOrderInputNumberValue;
  }
};

export const syncDataFromAllElements = () => {
  data.stationNameInputValue = stationNameInputElement.value;
  data.lineNameInputValue = lineNameInputElement.value;
  data.lineStartStationSelectorValue = lineStartStationSelectorElement.value;
  data.lineEndStationSelectorValue = lineEndStationSelectorElement.value;
  data.sectionOrderInputNumberValue = sectionOrderInputElement.value;
  data.sectionLineNameValue = sectionLineNameElement.value;
  data.sectionStationSelectorValue = sectionStationSelectorElement.value;
};

export const syncDataToAllElements = () => {
  stationNameInputElement.value = data.stationNameInputValue;
  lineNameInputElement.value = data.lineNameInputValue;
  lineStartStationSelectorElement.value = data.lineStartStationSelectorValue;
  lineEndStationSelectorElement.value = data.lineEndStationSelectorValue;
  sectionOrderInputElement.value = data.sectionOrderInputNumberValue;
  sectionLineNameElement.value = data.sectionLineNameValue;
  sectionStationSelectorElement.value = data.sectionStationSelectorValue;
};

export default {};
