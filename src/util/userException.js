import { NUMBER } from '../constants/index.js';

export const isValidStationNameLength = (name) => {
  return name.length >= NUMBER.VALID_STATION_NAME_LENGTH;
};

export const isDuplicatedName = (lists, inputName) => {
  return lists.some((element) => element.name === inputName);
};

export const isDuplicatedStation = (startStation, endStation) => {
  return startStation === endStation;
};

export const isValidLineNameLength = (lineName) => {
  return lineName < NUMBER.VALID_LINE_NAME_LENGTH;
};

export const isDuplicatedSection = (sections, stationSelect) => {
  return sections.some((section) => section === stationSelect);
};

export const isValidOrderInput = (sections, orderInput) => {
  return orderInput < 0 || orderInput > sections.length || orderInput === '';
};

export const isValidDeleteSection = (sections) => {
  return sections.length <= NUMBER.VALID_SECTION_LENGTH;
};
