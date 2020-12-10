class Line {
  stations = [];

  constructor(name, start, end) {
    this.name = name;
    this.stations = [start, end];
  }

  addSectionTo(stationName, idx) {
    this.stations = [...this.stations]
    this.stations.splice(idx, 0, stationName);
  }
}

export default {
  data: [],

  list() {
    if (this.data.length === 0) {
      return []
    }

    return this.data.map(line => {
      const name = line.name;
      const start = line.stations[0];
      const end = line.stations[line.stations.length - 1];

      return { name, start, end }
    })
  },

  add(name, start, end) {
    const isDuplicated = this.data.some(line => line.name === name);

    if(isDuplicated) {
      throw new Error('이미 중복된 노선 이름입니다.')
    }

    this.data = [...this.data, new Line(name, start, end)]
  },

  remove(name) {
    this.data = this.data.filter(line => line.name !== name);
  },

  get(name) {
    return this.data.find(line => line.name === name);
  }
}
