export const isValidNameLength = (name) => {
  return name.length >= 2;
};

export const isDuplicatedName = (lists, inputName) => {
  return lists.some((element) => element.name === inputName);
};

export const isDuplicatedSection = (sections, stationSelect) => {
  return sections.some((section) => section === stationSelect);
};
