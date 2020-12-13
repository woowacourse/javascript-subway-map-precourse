export const isValidStationName = (stations, name) => {
  if (name.length < 2) {
    alert('지하철 역은 2글자 이상이어야 합니다.');
    return false;
  }

  if (stations.map(station => station.name).includes(name)) {
    alert('중복된 지하철 역 이름입니다.');
    return false;
  }

  return true;
};
