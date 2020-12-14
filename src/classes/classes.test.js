import SubWayStation from './subwayStation.js';
import SubwayLine from './subwayLine.js';
import SubwayMap from './subwayMap.js';

describe('SubWayStation', () => {
  const station1Name = 'station1';
  const station2Name = 'station2';
  const station3Name = 'station3';
  const station1 = new SubWayStation();
  const station2 = new SubWayStation();
  const station3 = new SubWayStation();
  const subwayMap = new SubwayMap();
  subwayMap.addStation(station1, station1Name);
  subwayMap.addStation(station2, station2Name);
  subwayMap.addStation(station3, station3Name);
  it('add subway station', () => {
    expect(subwayMap.allStations).toHaveProperty(station1Name);
    expect(subwayMap.allStations).toHaveProperty(station2Name);
    expect(subwayMap.allStations).toHaveProperty(station3Name);
  });
  it('delete subway station', () => {
    subwayMap.deleteStationByName(station3Name);
    expect(subwayMap.allStations).toHaveProperty(station1Name);
    expect(subwayMap.allStations).toHaveProperty(station2Name);
    expect(subwayMap.allStations).not.toHaveProperty(station3Name);
  });
});

describe('SubwayLine', () => {
  const station1Name = 'station1';
  const station2Name = 'station2';
  const station3Name = 'station3';
  const station1 = new SubWayStation();
  const station2 = new SubWayStation();
  const station3 = new SubWayStation();
  const subwayMap = new SubwayMap();
  subwayMap.addStation(station1, station1Name);
  subwayMap.addStation(station2, station2Name);
  subwayMap.addStation(station3, station3Name);
  const line1 = new SubwayLine(station1Name, station2Name);
  const line2 = new SubwayLine(station2Name, station3Name);
  const line1Name = 'line1';
  const line2Name = 'line2';
  subwayMap.addLine(line1, line1Name);
  subwayMap.addLine(line2, line2Name);
  it('add subway line', () => {
    expect(subwayMap.allLines).toHaveProperty(line1Name);
    expect(subwayMap.allLines).toHaveProperty(line2Name);
  });
  it('delete subway line', () => {
    subwayMap.deleteLineByName(line2Name);
    expect(subwayMap.allLines).toHaveProperty(line1Name);
    expect(subwayMap.allLines).not.toHaveProperty(line2Name);
  });
  it('add station to line', () => {
    line1.addStationToLineByName(station3Name);
    expect(line1.allStationsInLine).toContain(station3Name);
  });
});
