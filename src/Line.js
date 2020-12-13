class Line {
  constructor(name, startStation, endStation) {
    this.name = name;
    this.sectionList = [startStation, endStation];
  }
}

export default Line;
