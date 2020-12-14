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

export const isAddedStation = (lines, station) => {
  const stationsNameInLines = lines
    .map(line => line.stations)
    .map(stations => stations.map(station => station.name));
  for (const stationsNameInLine of stationsNameInLines) {
    if (stationsNameInLine.includes(station.name)) {
      alert('등록된 역은 삭제 불가능 합니다.');
      return false;
    }
  }

  return true;
};

export const isValidLineName = (lines, newLine) => {
  if (newLine.name.length < 1) {
    alert('노선은 1글자 이상이어야 합니다.');
    return false;
  }

  if (lines.map(line => line.name).includes(newLine.name)) {
    alert('중복된 노선 이름입니다.');
    return false;
  }

  return true;
};

export const isValidLine = (start, end) => {
  if (start === end) {
    alert('상행과 하행역은 달라야 합니다');
    return false;
  }

  return true;
};

export const isValidSectionOrder = (stations, order) => {
  if (order <= 0 || stations.length <= order) {
    alert('구간은 역과 역사이에만 추가할 수 있습니다.');
    return false;
  }

  return true;
};

export const isValidSection = (stations, name) => {
  if (stations.map(station => station.name).includes(name)) {
    alert('이미 포함된 구간입니다.');
    return false;
  }

  return true;
};

export const isValidDeleteSection = stations => {
  if (stations.length <= 2) {
    alert('포함된 역이 두개 이하일 때는 역을 제거할 수 없습니다');
    return false;
  }

  return true;
};
