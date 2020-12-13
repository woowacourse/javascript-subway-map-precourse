class Line {
  constructor(name, startStation, endStation) {
    this.name = name;
    this.sections = [startStation, endStation];
  }

  getSections() {
    return [...this.sections];
  }

  getStartStation() {
    return this.sections[0];
  }

  getEndStation() {
    return this.sections[this.sections.length - 1];
  }

  addSection(index, station) {
    const sections = this.getSections();
    this.sections = sections.splice(index, 0, station);
  }

  removeSection(index) {
    const sections = this.getSections();
    this.sections = sections.splice(index, 1);
  }
}

export default Line;
