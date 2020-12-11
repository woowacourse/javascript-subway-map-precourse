import { save, load } from "../utils/storage.js";

const STORAGE_KEY = "lines";

function loadFromStorage() {
  const data = load(STORAGE_KEY);

  return data
    ? data.map((row) => {
        const name = row.name;
        const stations = row.stations;

        const line = new Line(name);
        line.stations = stations;
        return line;
      })
    : [];
}

class Line {
  stations = [];

  constructor(name, start, end) {
    this.name = name;
    this.stations = [start, end];
  }

  addSectionTo(stationName, idx) {
    this.stations = [...this.stations];
    this.stations.splice(idx, 0, stationName);
    LineModel.save();
  }

  removeSection(name) {
    this.stations = this.stations.filter((station) => station !== name);
    LineModel.save();
  }
}

const LineModel = {
  data: loadFromStorage(),

  list() {
    if (this.data.length === 0) {
      return [];
    }

    return this.data.map((line) => {
      const name = line.name;
      const start = line.stations[0];
      const end = line.stations[line.stations.length - 1];
      const stations = line.stations;

      return { name, start, end, stations };
    });
  },

  add(name, start, end) {
    const isDuplicated = this.data.some((line) => line.name === name);

    if (isDuplicated) {
      throw new Error("이미 중복된 노선 이름입니다.");
    }

    this.data = [...this.data, new Line(name, start, end)];
    this.save();
  },

  remove(name) {
    this.data = this.data.filter((line) => line.name !== name);
    this.save();
  },

  get(name) {
    return this.data.find((line) => line.name === name);
  },

  save() {
    const data = this.list().map((line) => ({
      name: line.name,
      stations: line.stations,
    }));
    save(STORAGE_KEY, data);
  },
};

export default LineModel;
