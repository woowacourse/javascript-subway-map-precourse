const SectionManager = function () {
  this.isExist = (sectionName, sections) =>
    sections.indexOf(sectionName) !== -1;

  this.isOrderCorrect = (order, sectionLength) =>
    order >= 0 && order <= sectionLength;
};
