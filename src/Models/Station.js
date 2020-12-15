export default {
  data: [],
  list() {
    return this.data;
  },
  add(name) {
    this.data.push(name);
  },
  delete(name) {
    const stationIndex = this.data.indexOf(name);
    this.data.splice(stationIndex, 1);
  },
};
